import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../entities/client';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user:any;
  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    // this.clientService.getAll().subscribe(value => {
    //   this.clients = value 
    //   // console.log(this.produits);
    // });
    // console.log("ok Clients"); 
    this.authService.getUser().subscribe(user =>{
      this.user = user;
    });
   
  }

}
