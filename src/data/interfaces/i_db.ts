import { Kunde } from "../entities/kunde";
import { Observable } from 'rxjs';

export interface IDb {
    getAllKunden(): Observable<Array<Kunde>>
    createKunde(kunde: Kunde): Observable<void>
    updateKunde(id: number, updated_kunde: Kunde): Observable<void>
    deleteKunde(id: number): Observable<void>
}