import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';
import { Operation } from '../entities/operation';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  operations = new BehaviorSubject<any>([null]);
  private jwtToken;

  private baseUrl:string = "http://localhost:8080/operations";

  constructor(private httpClient : HttpClient, private authService : AuthenticationService) { 
   
    this.jwtToken = this.authService.loadToken();
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

  addOperation(codeCompte, typeOperation, montant) {

    let data = `codeCompte=${codeCompte}&montant=${parseFloat(montant)}&employe=1`;

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': this.jwtToken
      })
    };
    return this.httpClient.put(`${this.baseUrl}/${typeOperation}` ,data, httpOptions);
  }
}
