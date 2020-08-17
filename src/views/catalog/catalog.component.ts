import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'home',
  template: `
    <h1>Catalog</h1>
    <p>
      <button (click)="logout()">Logout</button>
    </p>
  `,
})
export class CatalogViewComponent {

  constructor(private _loginService: LoginService) {}

  public logout() {
    this._loginService.doLogout().then(() => {
      console.log("Logged out");
    });
  }
}
