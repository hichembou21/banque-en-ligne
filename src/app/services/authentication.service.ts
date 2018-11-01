import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user = new BehaviorSubject<any>([])
  private jwtToken = new BehaviorSubject<any>([]);
  private host:string = "http://localhost:8080";

  constructor(private httpClient : HttpClient) { }

  login(user) {

    return this.httpClient.post(this.host+"/login",user,{observe:"response"});

  }

  saveToken(jwtToken:string) {
      localStorage.setItem("token", JSON.stringify(jwtToken));
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
      this.user.next(user);
  }

  loadToken() {
    this.jwtToken.next(JSON.parse(localStorage.getItem("token")));
  }

  getJwtToken() {
    return this.jwtToken;
  }
}
