import { Injectable, OnDestroy } from "@angular/core";
import { v4 as uuidv4 } from "uuid";
import { Subject } from "rxjs";

import { PermissionService } from '../../app/permission.service';

@Injectable()
export class LoginService implements OnDestroy {

  private readonly AuthTokenKey = "AUTH-TOKEN-KEY";
  public AuthState:Subject<string> = new Subject<string>();

  constructor(private _permissionService: PermissionService) {
    this.AuthState.subscribe((token) => {
      if(token) {
        sessionStorage.setItem(this.AuthTokenKey, token);
      } else {
        sessionStorage.removeItem(this.AuthTokenKey);
      }
    });
  }
  
  public getToken(): string {
    return null;
  } 

  private _authenticate(): Promise<string> {
    let token = sessionStorage.getItem(this.AuthTokenKey);
    const p = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if(!token) {
          token = uuidv4();
        }
        this.AuthState.next(token);
        resolve(token);
      }, 1000);
    });
    // return the promise
    return p;
  }

  public doLogin(): Promise<string> {
    return this._authenticate().then( (token) => {
      return this._permissionService.getPermission(token);
    }).then((permission => Promise.resolve(permission)));
  }

  public isAuthenticated(): boolean {
    let token = sessionStorage.getItem(this.AuthTokenKey);
    return token && true;
  }

  public getAuthToken(): string {
    let token = sessionStorage.getItem(this.AuthTokenKey);
    return token;
  }

  public doLogout(): Promise<void> {
    this.AuthState.next(undefined);
    return Promise.resolve();
  }

  public ngOnDestroy(): void {}
}