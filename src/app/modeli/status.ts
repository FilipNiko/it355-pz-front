export class Status {
    id: number;
    status: string;

    constructor(id?: number, status?: string) {
        this.id = id || 0;
        this.status = status || '';
    }
}