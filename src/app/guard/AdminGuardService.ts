import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private storageService: StorageService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        const isAdmin = this.storageService.isAdmin();
        console.log('canActivate', isAdmin);
        return isAdmin;
    }
}