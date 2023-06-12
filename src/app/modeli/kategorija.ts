export class Kategorija {
    id: number;
    kategorijaNaziv: string;


    constructor(kategorijaNaziv?: string) {
        this.kategorijaNaziv = kategorijaNaziv || '';


    }
}