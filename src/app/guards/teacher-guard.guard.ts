import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services/services.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuardGuard implements CanActivate {

  constructor(private service : ServicesService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.service.getCookie('type')=='teacher' || this.service.getCookie('type')=='admin')
    return true;

    return false;
  }
  
}
