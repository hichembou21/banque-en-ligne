import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  user:any;
  status:any;
  jwtToken:string = "";
  baseUrl:string = "http://ec2-54-164-144-216.compute-1.amazonaws.com:8080/";

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

      return this.httpClient.get(this.baseUrl+"clients/"+username,
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

      return this.httpClient.post(this.baseUrl+"clients",user,
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

      return this.httpClient.post(this.baseUrl+"employes",user,
        httpOptions)
      .pipe(tap(res => {
      this.status = res; 
      }));
}
}
