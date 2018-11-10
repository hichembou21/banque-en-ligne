import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OperationsService } from '../services/operations.service';
import { CompteService } from '../services/compte.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {

  operations:any = null;
  compte:any = null;
  isEmploye:boolean = false;
  codeCompte1:string;
  codeCompte2:string;
  typeOperation:string;
  montant:number;
  currentPage:number = 0;
  sizePage:number = 5
  totalPages=[];
  // @Output() onClickEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private operationService:OperationsService, private compteService:CompteService, private authService : AuthenticationService) 
  {
   
  }

  ngOnInit() {
    this.authService.isEmploye().subscribe(isEmp => {
      this.isEmploye = isEmp;
    });    
    this.typeOperation = 'crediter';
  }

  getCompte() {
    this.compteService.getOne(this.codeCompte1).subscribe(data => {
      this.compte = data;
      console.log(this.compte);
    }, error => {

    });
  }

  getOperations() {
    this.operationService.getOperationsOfCompte(this.codeCompte1, this.currentPage, this.sizePage).subscribe(value => {
      this.operations = value;
      this.totalPages = new Array(this.operations.totalPages);
      console.log(this.operations);
    }, error => {

    });
  }

  search() {
    this.getCompte();
    this.getOperations();    
    console.log('ok search');
  }

  addOperation() {
  
    this.operationService.addOperation(this.compte.code, this.codeCompte2, this.typeOperation,this.montant).subscribe(res => {
      if (res) {
        this.search();
      }
      this.typeOperation = 'crediter';
      this.codeCompte2 = null;
    });
  }

  goToPage(page) {
    this.currentPage = page;
    this.getOperations();
  }

}
