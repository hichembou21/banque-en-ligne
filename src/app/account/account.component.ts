import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../entities/client';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user:any;
  isEmploye:boolean;

  constructor(private authService:AuthenticationService, private router : Router) { }

  ngOnInit() {
    // this.clientService.getAll().subscribe(value => {
    //   this.clients = value 
    //   // console.log(this.produits);
    // });
    // console.log("ok Clients"); 
    this.authService.getUser().subscribe(user =>{
      this.user = user;
    });

    this.authService.getIsLogged().subscribe(isLogged => {
      if (!isLogged) {
        this.router.navigateByUrl("/login");
      }
    })

    // this.authService.getIsEmpl().subscribe(isEmpl => {
    //   this.isEmploye = isEmpl;
    //   console.log(this.isEmploye);
    // });   
    this.isEmploye = this.authService.isEmploye();
    console.log(this.isEmploye);
  }

}
