import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

const APIEndpoint = environment.backUrl;


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  user:any;
  status:any;
  jwtToken:string = "";
  //baseUrl:string = "https://www.simplonlyon.fr/promo5/hbouaffar/certif/";

  constructor(private httpClient : HttpClient, private authService : AuthenticationService) {
    this.jwtToken = authService.getJwtToken();
   }

    getOne(username) {

      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded',
          'Authorization': this.jwtToken
        })
      };

      return this.httpClient.get(APIEndpoint+"/clients/"+username,
                                  httpOptions)
      .pipe(tap(res => {
        this.user = res; 
      }));
    }

    addClient(user) {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': this.jwtToken
        })
      };

      return this.httpClient.post(APIEndpoint+"/clients",user,
                                  httpOptions)
      .pipe(tap(res => {
        this.status = res; 
      }));
    }

    addEmploye(user) {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': this.jwtToken
        })
      };

      return this.httpClient.post(APIEndpoint+"/employes",user,
        httpOptions)
      .pipe(tap(res => {
      this.status = res; 
      }));
}
}
