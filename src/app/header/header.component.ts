import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged:boolean = false;
  username:string;
  constructor(private authService : AuthenticationService, private router:Router) { }

  ngOnInit() {
    this.authService.getIsLogged().subscribe(isLogged =>{
      this.isLogged = isLogged;
    });

    this.authService.getUsernameForHeader().subscribe(username => {
      this.username = username;
    }) ;
  }

  onLogout() {
    this.authService.logout();
    this.username = null;
    this.router.navigateByUrl("/login");
  }

}
