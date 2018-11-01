import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OperationsService } from '../services/operations.service';
import { CompteService } from '../services/compte.service';
import { Compte } from '../entities/compte';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  operations;
  compte;
  typeOperation:string = "crediter";
  montant:number;
  @Output() onClickAddEvent: EventEmitter<string> = new EventEmitter;

  constructor(private operationService:OperationsService, private compteService:CompteService) 
  {   }

  ngOnInit() {
    this.operationService.operations.subscribe(ops => {
      this.operations = ops;
    });
    this.compteService.compte.subscribe(cpt => {
      this.compte = cpt;
    });
  }

  addOperation() {
    // this.compte = this.compteServie.compte;
    this.operationService.addOperation(this.compte.code,this.typeOperation,this.montant).subscribe();
    
    this.onClickAddEvent.emit(this.compte.code);

    console.log("add operation");
  }

  // onClick() {
  //   this.onClickEvent.emit(this.compte.code);
  // }

}
