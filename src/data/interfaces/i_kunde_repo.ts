import { Observable } from 'rxjs';
import { Kunde } from '../entities/kunde';


export interface IKundeRepository {
  getAll(): Observable<Kunde[]>;
  create(kunde: Kunde): Observable<void>;
  update(id: number, updatedKunde: Kunde): Observable<void>;
  delete(id: number): Observable<void>;
}
