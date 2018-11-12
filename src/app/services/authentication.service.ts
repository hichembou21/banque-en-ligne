import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user:any;
  private username:string = "";
  private usernameForHeader = new BehaviorSubject<string>(null);
  private jwtToken:string="";
  private isLogged = new BehaviorSubject<boolean>(false);
  private isEmpl = new BehaviorSubject<boolean>(false);
  private isAdm = new BehaviorSubject<boolean>(false);
  private roles:Array<any> = [];
  private message:string; 
  //private host:string = "http://localhost:8080";
  private host:string = "http://ec2-54-164-144-216.compute-1.amazonaws.com:8080";

  constructor(private httpClient : HttpClient) { }

  login(user) {

    return this.httpClient.post(this.host+"/login",user,{observe:"response"});

  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("user");
    localStorage.removeItem("isEmpl");
    localStorage.removeItem("isAdm");
    localStorage.removeItem("username");

    this.setJwtToken(null);
    this.setIsLogged(false);
    this.setUser(null);
    this.isEmpl.next(false);
    this.isAdm.next(false);
    this.username = null;
  }

  saveToken(jwtToken:string) {
      this.setJwtToken(jwtToken);
      localStorage.setItem("token", JSON.stringify(jwtToken));
      let jwtHelper = new JwtHelperService();
      this.roles = jwtHelper.decodeToken(this.getJwtToken()).roles;
      return this.roles;
  }

  getRoles() {
      let jwtHelper = new JwtHelperService();
      this.roles = jwtHelper.decodeToken(this.loadToken()).roles;
      return this.roles;
  }

  getUser() {
    if (JSON.parse(localStorage.getItem("user"))) {
      this.user = JSON.parse(localStorage.getItem("user")); 
    }
    return this.user;
  }

  setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
      this.user = user;
  }

  getUsername() {
    if (JSON.parse(localStorage.getItem("username"))) {
      this.username = JSON.parse(localStorage.getItem("username")); 
    }
    return this.username;
  }

  setUsername(username) {
    localStorage.setItem("username", JSON.stringify(username));
    this.username = username;
  }

  setUsernameForHeader(username) {
    this.usernameForHeader.next(username);
  }

  getUsernameForHeader() {
    if (JSON.parse(localStorage.getItem("username"))) {
      this.usernameForHeader.next(JSON.parse(localStorage.getItem("username"))); 
    }
    return this.usernameForHeader;
  }

  getIsLogged() {

    let isLogged = JSON.parse(localStorage.getItem("isLogged"))
    if (isLogged) {
      this.isLogged.next(isLogged);
      return this.isLogged;
    }
    return this.isLogged;
  }

  getIsEmpl() {
    return this.isEmpl;
  }

  setIsLogged(isLogged) {
    localStorage.setItem("isLogged", JSON.stringify(isLogged));
    this.isLogged.next(isLogged);
  }

  loadToken():string {
    this.setJwtToken(JSON.parse(localStorage.getItem("token")));
    return this.jwtToken;
  }

  getJwtToken() {
    return this.jwtToken;
  }

  setJwtToken(jwtToken) {
    this.jwtToken = jwtToken;
  }

  isEmploye():BehaviorSubject<boolean> {
    let roles = this.getRoles();
    for (let role of roles ) {
      if (role.authority == "EMPLOYE") {
        this.isEmpl.next(true);
        return this.isEmpl;
      } 
    }
    return this.isEmpl;
  }

  isAdmin():BehaviorSubject<boolean> {
    let roles = this.getRoles();
    for (let role of roles ) {
      if (role.authority == "ADMIN") {
        this.isAdm.next(true);
        return this.isAdm
      }
    }
    return this.isAdm;
  }

  getMessage() {
    return this.message;
  }

  setMessage(message) {
    this.message = message;
  }
}
