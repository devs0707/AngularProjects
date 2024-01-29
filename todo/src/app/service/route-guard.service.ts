import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterEvent, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {
  constructor( private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService) { 

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.hardcodedAuthenticationService.isUserLoggedIn())
      return true;
    this.router.navigate(['login']);
    return false;
  }
}
