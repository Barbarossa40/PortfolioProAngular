import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'})

export class AuthGuard implements CanActivate {
  constructor(
      private _router: Router, private _authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this._authService.currentUserValue;
      if (currentUser.isAuthenticated) 
      {
          return true;
      }
      else{
      this._router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
      return false;}
  }
}