import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  compte = new BehaviorSubject<any>([null])
  jwtToken:string="";
  baseUrl:string = "http://mabanqueenligne.us-east-1.elasticbeanstalk.com/comptes/";
  
  baseUrlforC:string = "http://mabanqueenligne.us-east-1.elasticbeanstalk.com/client/comptes/";

  constructor(private httpClient : HttpClient, private authService : AuthenticationService) {
    this.jwtToken = this.authService.loadToken();
   }

  getOne(codeCompte) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.jwtToken
      })
    };
    return this.httpClient.get(`${this.baseUrl}${codeCompte}`, httpOptions)
    .pipe(tap(res => {
      this.compte.next(res);
    }
    ));
  }

  getOneForClient(codeCompte, codeClient) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.jwtToken
      })
    };
    return this.httpClient.get(`${this.baseUrlforC}${codeCompte}/${codeClient}`, httpOptions)
    .pipe(tap(res => {
      this.compte.next(res);
    }
    ));
  }

  addCompte(compte, codeClient) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.jwtToken
      })
    };
    return this.httpClient.post(`${this.baseUrl}${codeClient}`,compte, httpOptions);
  }

}
