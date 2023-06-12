export class Korisnik{
    id: number;
    username: string;
    email: string;

    constructor(username?: string, email?: string) {
        this.username = username || '';
        this.email = email || '';
    }

}