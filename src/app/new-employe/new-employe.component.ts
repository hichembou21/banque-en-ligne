import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-new-employe',
  templateUrl: './new-employe.component.html',
  styleUrls: ['./new-employe.component.css']
})
export class NewEmployeComponent implements OnInit {

  errorMessage:string;
  employeSup:any;

  constructor(private clientService : ClientService, private router : Router, private authService : AuthenticationService) { }

  ngOnInit() {
    this.employeSup = this.authService.getUser();
  }

  onRegisration(employe) {
    // this.clientService.addEmploye(employe).subscribe(res => {
    //   this.router.navigateByUrl("/account");
    // }, error => {
    //   this.errorMessage = error.error;
    //   console.log(employe);
    // });
    console.log(employe);
  }

}
