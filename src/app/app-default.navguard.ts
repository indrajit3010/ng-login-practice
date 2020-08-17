import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { LoginService } from "./login.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AppDefaultNavguard implements CanActivate {
  
  constructor(private _router: Router, private _loginService: LoginService){}
  
  public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
  ): boolean | Promise<boolean> | UrlTree {
    if (this._loginService.isAuthenticated()){
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

}