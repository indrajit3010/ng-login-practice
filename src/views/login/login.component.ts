import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { LoginService } from '../../app/login.service';

@Component({
  selector: 'login',
  template: `
    <h1>Login</h1>
    <div class="container">
    <a routerLinkActive="active" 
       routerLink="/home">Home</a> | 

    <a routerLinkActive="active" 
      routerLink="/catalog">Catalog</a> 
    <p>
      <button (click)="login()">Login</button>
    </p>
    <router-outlet></router-outlet>
  </div>
  `,
})
export class LoginViewComponent {

  constructor(private _loginService: LoginService){}

  public login(): void {
    this._loginService.doLogin().then((token) => {
      console.log("TOKEN -> ", token);
    });
  }
}
