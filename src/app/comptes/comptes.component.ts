import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OperationsService } from '../services/operations.service';
import { CompteService } from '../services/compte.service';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {

  operations:any = null;
  compte:any = null;
  codeCompte:string;
  typeOperation:string = "crediter";
  montant:number;
  currentPage:number = 0;
  sizePage:number = 5
  totalPages=[];
  // @Output() onClickEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private operationService:OperationsService, private compteService:CompteService) 
  {
   
  }

  ngOnInit() {
        
  }

  getCompte() {
    this.compteService.getOne(this.codeCompte).subscribe(data => {
      this.compte = data;
      console.log(this.compte);
    }, error => {

    });
  }

  getOperations() {
    this.operationService.getOperationsOfCompte(this.codeCompte, this.currentPage, this.sizePage).subscribe(value => {
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
    this.operationService.addOperation(this.compte.code,this.typeOperation,this.montant).subscribe(res => {
      if (res) {
        this.search();
      }
    });
    console.log("addops");
  }

  goToPage(page) {
    this.currentPage = page;
    this.getOperations();
  }

}
