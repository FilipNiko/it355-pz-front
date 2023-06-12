import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private storageService: StorageService) {}
    
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        const isLoggedIn = this.storageService.isLoggedIn();
        console.log('canActivate', isLoggedIn);
        return isLoggedIn;
    }
}