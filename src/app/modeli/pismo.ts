export class Pismo {
    id: number;
    pismo: string;

    constructor(id: number, pismo?: string) {
        this.id = id;
        this.pismo = pismo || '';
    }
}