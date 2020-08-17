import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class PermissionService implements OnDestroy {

  public PermissionState:Subject<PermissionObject> = new Subject<PermissionObject>();

  public getPermission(token: string): Promise<string> {
    const roles = ["Client", "Employee", "Other"];
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        this.PermissionState.next(
          new PermissionObject(roles[Math.floor(Math.random() * Math.floor(roles.length))])
        );
        resolve(token);
      }, 1000);
    });
  }

  public ngOnDestroy(): void {

  }
}

export class PermissionObject {
  private _role: string;

  constructor(role: string) {
    this._role = role;
  }

  public get Role(): string {
    return this._role;
  }

  public set Role(role) {
    this._role = role;
  }
}