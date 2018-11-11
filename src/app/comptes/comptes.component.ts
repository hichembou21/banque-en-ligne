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
  currentUser:any
  compte:any = null;
  isEmploye:boolean = false;
  codeCompte1:string;
  codeCompte2:string;
  typeOperation:string = 'crediter';
  montant:number;
  currentPage:number = 0;
  sizePage:number = 5
  totalPages=[];
  errorMessage:any = {
    messageCpt : null,
    messageOp : null
  };
  // @Output() onClickEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private operationService:OperationsService, private compteService:CompteService, private authService : AuthenticationService) 
  {
   
  }

  ngOnInit() {
    this.authService.isEmploye().subscribe(isEmp => {
      this.isEmploye = isEmp;
      if (!this.isEmploye) {
        this.typeOperation = 'virement';
      }
    });    
    this.currentUser = this.authService.getUser();
  }

  getCompte() {
    this.compte = null;
    this.currentPage = 0;
    this.errorMessage.messageCpt = null;
    this.errorMessage.messageOp = null;

    if (this.isEmploye) {
      this.compteService.getOne(this.codeCompte1).subscribe(data => {
        this.compte = data;
      }, error => {
        this.errorMessage.messageCpt = error.error.message;
      });
    } else {
      this.compteService.getOneForClient(this.codeCompte1, this.currentUser.id).subscribe(data => {
        this.compte = data;
      }, error => {
        this.errorMessage.messageCpt = error.error.message;
      });
    }
  }

  getOperations() {
    this.operationService.getOperationsOfCompte(this.codeCompte1, this.currentPage, this.sizePage).subscribe(value => {
      this.operations = value;
      this.totalPages = new Array(this.operations.totalPages);
    }, error => {

    });
  }

  search() {
    this.getCompte();
    this.getOperations();    
  }

  addOperation() {
  
    this.operationService.addOperation(this.compte.code, this.codeCompte2, this.typeOperation,this.montant, this.currentUser.id).subscribe(res => {
      if (res) {
        this.search();
      }
      this.typeOperation = 'crediter';
      this.codeCompte2 = null;
    }, error => {
      this.errorMessage.messageOp = error.error.message;
    });
  }

  goToPage(page) {
    this.currentPage = page;
    this.getOperations();
  }

}
