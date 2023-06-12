import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }


  public isAdmin(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      const roles: string[] = JSON.parse(user).roles;
      return roles.includes('ROLE_ADMIN');;
    }

    return false;
  }

  public getIdKorisnika(): number {
    const userString = window.sessionStorage.getItem(USER_KEY);
    if(userString){
      const user = JSON.parse(userString);
      return Number(user.id);
    }
    return 0;
}

}
