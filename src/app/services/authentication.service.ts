import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user = new BehaviorSubject<any>([])
  private jwtToken:string="";
  private isLogged=new BehaviorSubject<boolean>(false);
  private roles:Array<any> = [];
  private host:string = "http://localhost:8080";

  constructor(private httpClient : HttpClient) { }

  login(user) {

    return this.httpClient.post(this.host+"/login",user,{observe:"response"});

  }

  logout() {
    localStorage.removeItem("token");
    this.setJwtToken(null);
    this.setIsLogged(false);
    this.setUser(null);
  }

  saveToken(jwtToken:string) {
      this.setJwtToken(jwtToken);
      localStorage.setItem("token", JSON.stringify(jwtToken));
      let jwtHelper = new JwtHelperService();
      this.roles = jwtHelper.decodeToken(this.getJwtToken()).roles;
      // this.getJwtToken().subscribe(jwt =>{
      //   this.roles = jwtHelper.decodeToken(jwt).roles;
      // });
      // console.log(this.roles);
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
      this.user.next(user);
  }

  getIsLogged() {
    return this.isLogged;
  }

  // getIsEmpl() {
  //   return this.isEmpl;
  // }

  setIsLogged(isLogged) {
    this.isLogged.next(isLogged);
  }

  loadToken() {
    this.setJwtToken(JSON.parse(localStorage.getItem("token")));
  }

  getJwtToken() {
    return this.jwtToken;
  }

  setJwtToken(jwtToken) {
    this.jwtToken = jwtToken;
  }

  isEmploye() {
    for (let role of this.roles ) {
      if (role.authority == "EMPLOYE") 
          return true;
    }
    return false;
  }
}
