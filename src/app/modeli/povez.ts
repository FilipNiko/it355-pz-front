export class Povez {
    id: number;
    vrsta: string;

    constructor(id: number, vrsta?: string) {
        this.id = id;
        this.vrsta = vrsta || '';
    }
}