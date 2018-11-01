import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../entities/client';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clients:Client[];
  baseUrl:string = "http://localhost:8080/clients";

  constructor(private httpClient : HttpClient) { }

  getAll() {
    return this.httpClient.get<Client[]>(this.baseUrl)
    .pipe(tap(res => {
      this.clients = res;
    }
    )).pipe(map( res => this.clients = res));
  }
}
