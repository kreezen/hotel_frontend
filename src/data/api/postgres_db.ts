import { Kunde } from "../entities/kunde";
import { IDb } from "../interfaces/i_db";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { API_ENDPOINT } from "./api_endpoints";

@Injectable({
  providedIn: 'root',
})

export class PostgresDbService implements IDb {

  private apiEndpoint: string;

  constructor(private httpClient: HttpClient, @Inject(API_ENDPOINT) apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }

  getAllKunden(): Observable<Kunde[]> {
    console.log(`${this.apiEndpoint}`)
    return this.httpClient.get<Kunde[]>(`${this.apiEndpoint}`);
  }

  createKunde(kunde: Kunde): Observable<void> {
    console.log(`${this.apiEndpoint}`)
    console.log(kunde)
    return this.httpClient.post<void>(`${this.apiEndpoint}`, kunde);
  }

  updateKunde(id: number, updated_kunde: Kunde): Observable<void> {
    console.log(`${this.apiEndpoint}/${id}`)
    console.log(updated_kunde)
    return this.httpClient.put<void>(`${this.apiEndpoint}/${id}`, updated_kunde);
  }

  deleteKunde(id: number): Observable<void> {
    console.log(`${this.apiEndpoint}/${id}`)
    return this.httpClient.delete<void>(`${this.apiEndpoint}/${id}`);
  }

}