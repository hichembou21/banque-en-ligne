import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompteService } from '../services/compte.service';
import { ClientService } from '../services/client.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-compte',
  templateUrl: './new-compte.component.html',
  styleUrls: ['./new-compte.component.css']
})
export class NewCompteComponent implements OnInit {

  currentUser:any;
  registerForm:FormGroup;
  errorMessage:string;

  constructor(private formBuilder: FormBuilder, private compteService : CompteService, private authService : AuthenticationService, private router : Router) { }

  ngOnInit() {

    this.currentUser = this.authService.getUser();
    this.registerForm = this.formBuilder.group({
      type_compte: ['CC', [Validators.required]],
      code: ['', Validators.required],
      solde: [0],
      codeClient: this.formBuilder.group({id:null}),
      decouvert: [0],
      taux: [''],
      employe:[this.currentUser]
  });

  }

  get f() { return this.registerForm.controls; }

  onAddCompte() {

    let id = parseInt(this.registerForm.value.codeClient.id);
    console.log(id);
    delete this.registerForm.value.codeClient; 
    if (this.registerForm.value.taux) {
      delete this.registerForm.value.decouvert; 
      this.registerForm.value.taux = parseFloat(this.registerForm.value.taux);      
    } else {
      delete this.registerForm.value.taux;    
      this.registerForm.value.decouvert = parseFloat(this.registerForm.value.decouvert);         
    }
    this.registerForm.value.solde = parseFloat(this.registerForm.value.solde);
    this.compteService.addCompte(this.registerForm.value, id).subscribe(compte => {
      this.authService.setMessage("Compte "+ this.registerForm.value.code +" ajouter avec succés")
      this.router.navigateByUrl("/account");
    }, error => {
      this.errorMessage = error.error.message;
    })
  }

}
