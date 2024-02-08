// PostgresKundeRepository.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IKundeRepository } from '../interfaces/i_kunde_repo';
import { PostgresDbService } from '../api/postgres_db';
import { Kunde } from '../entities/kunde';


@Injectable({
  providedIn: 'root',
})

export class PostgresKundeRepository implements IKundeRepository{
  constructor(private postgresDbService: PostgresDbService) {}

  getAll(): Observable<Kunde[]> {
    return this.postgresDbService.getAllKunden();
  }

  create(kunde: Kunde): Observable<void> {
    return this.postgresDbService.createKunde(kunde);
  }

  update(id: number, updatedKunde: Kunde): Observable<void> {
    return this.postgresDbService.updateKunde(id, updatedKunde)
  }

  delete(id: number): Observable<void> {
    return this.postgresDbService.deleteKunde(id);
  }
}
