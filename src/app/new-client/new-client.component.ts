import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  idEmploye:any;
  errorMessage:string;
  msg:string;

  constructor(private authService : AuthenticationService, private clientService : ClientService, private router : Router) { }

  ngOnInit() {
    // this.idEmploye = this.authService.getUser().id;
  }

  onRegisration(user) {

    this.clientService.addClient(user).subscribe(res => {
      this.authService.setMessage("Client ajouter avec succés")
      this.router.navigateByUrl("/account");
    }, error => {
      this.errorMessage = error.error;
      console.log(user);
    });

  }

}
