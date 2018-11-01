import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  compte = new BehaviorSubject<any>([])
  baseUrl:string = "http://localhost:8080/comptes/";

  constructor(private httpClient : HttpClient) { }

  getOne(codeCompte) {
    return this.httpClient.get(`${this.baseUrl}${codeCompte}`)
    .pipe(tap(res => {
      this.compte.next(res);
    }
    ));
  }

}
