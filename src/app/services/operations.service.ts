import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';
import { Operation } from '../entities/operation';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',

  })
};

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  operations = new BehaviorSubject<any>([]);
  private jwtToken;

  private baseUrl:string = "http://localhost:8080/operations";

  constructor(private httpClient : HttpClient, private authService : AuthenticationService) { 
    this.authService.getJwtToken().subscribe(jwt =>{
      this.jwtToken = jwt;
    })
  }

  getOperationsOfCompte(codeCompte) {

    return this.httpClient.get(`${this.baseUrl}?codeCompte=${codeCompte}&page=0&size=3`, 
                            { headers: new HttpHeaders({'Authorization': this.jwtToken})})
                          .pipe(tap(res => {
                            this.operations.next(res);
                          }
                          ));
  }

  addOperation(codeCompte, typeOperation, montant) {

    let data = `codeCompte=${codeCompte}&montant=${parseFloat(montant)}&employe=1`;

    return this.httpClient.put(`${this.baseUrl}/${typeOperation}` ,data, httpOptions);
  }
}
