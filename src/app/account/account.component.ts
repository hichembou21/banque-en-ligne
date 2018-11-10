import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentUser:any;
  username:string;
  isEmploye:boolean;
  isAdmin:boolean;
  message:string = null;

  constructor(private authService:AuthenticationService, private router : Router, private clientService : ClientService) { }

  ngOnInit() { 

    this.currentUser = this.authService.getUser();
    if (this.currentUser == null) {
        this.username = this.authService.getUsername(); 
        this.clientService.getOne(this.username).subscribe( response => {
        this.currentUser = response;
        this.authService.setUser(this.currentUser);
          });
      }   

    this.authService.getIsLogged().subscribe(isLogged => {
      if (!isLogged) {
        this.router.navigateByUrl("/login");
      }
    });
  
    this.authService.isEmploye().subscribe(isEmp => {
      this.isEmploye = isEmp;
    });

    this.authService.isAdmin().subscribe(isAdm => {
      this.isAdmin = isAdm;
    });

    this.message = this.authService.getMessage();
    this.authService.setMessage(null);
  }

  showCompte() {
    this.router.navigateByUrl('/compte');
  }

  addClient() {
    this.router.navigateByUrl('/add-client');
  }

  AddEmploye() {
    this.router.navigateByUrl('/add-employe');
  }

  addCompte() {
    this.router.navigateByUrl('/add-compte');

  }
}
