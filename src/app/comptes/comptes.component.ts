import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OperationsService } from '../services/operations.service';
import { CompteService } from '../services/compte.service';


@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {

  operations:any;
  compte:any;
  codeCompte:string;
  // @Output() onClickEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private operationService:OperationsService, private compteService:CompteService) 
  {
   
  }

  ngOnInit() {
    
  }

  search() {

    this.compteService.getOne(this.codeCompte).subscribe(data => {
      this.compte = data;
      console.log(this.compte);
    }, error => {
      console.log(error);
    });
    
    this.operationService.getOperationsOfCompte(this.codeCompte).subscribe(value => {
      this.operations = value;
      console.log(this.operations); 
    }, error => {
      console.log(error);
    });

    console.log("search");
  }

  research($event) {
    this.search();
  }

}
