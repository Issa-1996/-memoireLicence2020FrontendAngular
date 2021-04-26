import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate() {
    //console.log(this.auth.hasToken());
    
    if(!this.auth.hasToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  
}
