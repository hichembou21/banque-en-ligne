import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';
import { Operation } from '../entities/operation';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

const APIEndpoint = environment.backUrl;

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  operations = new BehaviorSubject<any>([null]);
  private jwtToken;
  private isEmploye:boolean=false;
  private baseUrl:string = APIEndpoint+"/operations";

  constructor(private httpClient : HttpClient, private authService : AuthenticationService) { 
   
    this.jwtToken = this.authService.loadToken();
    this.baseUrl = APIEndpoint+"/operations";
    this.authService.isEmploye().subscribe(isEmp => {
      this.isEmploye = isEmp;
    });
  }

  getOperationsOfCompte(codeCompte, currentPage, sizePage) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': this.jwtToken
      })
    };
    
    return this.httpClient.get(`${this.baseUrl}?codeCompte=${codeCompte}&page=${currentPage}&size=${sizePage}`, 
                                httpOptions)
                          .pipe(tap(res => {
                            this.operations.next(res);
                          }
                          ));
  }

  addOperation(codeCompte, codeCompte2, typeOperation, montant, employe) {

    let data = `codeCompte=${codeCompte}&montant=${parseFloat(montant)}&employe=1`;
    this.baseUrl = APIEndpoint+"/operations";

    if (typeOperation == 'virement') {
      if (!this.isEmploye) {
        employe = 1;
      }
      data = `codeCompte=${codeCompte}&codeCompte2=${codeCompte2}&montant=${parseFloat(montant)}&employe=${employe}`;
      this.baseUrl = APIEndpoint+"/client/operations";
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': this.jwtToken
      })
    };
    return this.httpClient.put(`${this.baseUrl}/${typeOperation}` ,data, httpOptions);
  }
}
