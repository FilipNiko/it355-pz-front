import { Korisnik } from "./korisnik";
import { Status } from "./status";
import { Stavka } from "./stavka";

export class Porudzbina {
    id: number;
    korisnik: Korisnik;
    datumKreiranja: string;
    ime: string;
    prezime: string;
    grad: string;
    adresa: string;
    zip: number;
    brTelefona: number;
    status: Status;

    constructor(korisnik?: Korisnik, datumKreiranja?: string, ime?: string, prezime?: string, grad?: string, adresa?: string, zip?: number, brTelefona?: number, status?: Status) {
        this.korisnik = korisnik || new Korisnik();
        this.datumKreiranja = datumKreiranja || '';
        this.ime = ime || '';
        this.prezime = prezime || '';
        this.grad = grad || '';
        this.adresa = adresa || '';
        this.zip = zip || 0;
        this.brTelefona = brTelefona || 0;
        this.status = status || new Status();
    }
}