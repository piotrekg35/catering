import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { RolesService } from '../Services/roles.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isLogged:boolean=false;
  constructor( private rs: RolesService, public router: Router, private angularFireAuth: AngularFireAuth){
    rs.loggedObservable.subscribe(a=>this.isLogged=a);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.isLogged);
      if(!this.isLogged){this.router.navigate(['zaloguj']);return true;}
      return this.rs.adminObservable.pipe(map(state => 
      {
        if(state === true) { 
        return true; 
        }
        this.router.navigate(['/']) ; 
        return false;
      }));      
    }
}
