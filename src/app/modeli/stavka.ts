import { Knjiga } from "./knjiga";
import { Porudzbina } from "./porudzbina";

export class Stavka{
    id: number;
    porudzbina: Porudzbina;
    knjiga: Knjiga;
    brojPrimeraka: number;

    constructor(knjiga: Knjiga, brojPrimeraka: number, porudzbina: Porudzbina) {
        this.knjiga = knjiga;
        this.brojPrimeraka = brojPrimeraka;
        this.porudzbina = porudzbina;
    }
}