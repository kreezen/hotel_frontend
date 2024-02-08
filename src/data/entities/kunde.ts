import { Adresse } from "./adresse";

export interface Kunde {
    id: number,
    nachname: string,
    vorname: string,
    tel: number,
    adresse: Adresse
}