import { JsonProperty } from "typescript-json-serializer";
import { Kategorija } from "./kategorija";
import { Pismo } from "./pismo";
import { Povez } from "./povez";

export class Knjiga {
    id: number;
    naziv: string;
    autor: string;
    opis: string;
    pismo: Pismo;
    povez: Povez;
    brojStrana: number;
    stanje: number;
    slikaUrl: string;
    kategorijeId: number;
    kategorijaNaziv: string;
    kategorija: Kategorija;
    cena: number;


    constructor(naziv: string, autor: string, opis: string, pismo: Pismo, povez: Povez, brojStrana: number, stanje: number, slikaUrl: string, kategorija: Kategorija, cena: number ) {
        this.naziv = naziv;
        this.autor = autor;
        this.opis = opis;
        this.pismo = pismo;
        this.povez = povez;
        this.brojStrana = brojStrana;
        this.stanje = stanje;
        this.slikaUrl = slikaUrl;
        this.kategorija = kategorija;
        this.cena = cena;

    }
}