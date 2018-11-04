import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../entities/client';
import { tap, map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  user:any;
  jwtToken:string = "";
  baseUrl:string = "http://localhost:8080/clients";

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

    return this.httpClient.get(this.baseUrl+"/"+username,
                                httpOptions)
    .pipe(tap(res => {
      this.user = res; 
    }));
}
}
