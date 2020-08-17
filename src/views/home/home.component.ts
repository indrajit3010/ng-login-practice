import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { LoginService } from '../../app/login.service';

@Component({
  selector: 'home',
  template: `
    <div>
      <h1>Home</h1>
      <h3>Total users: # {{users?.length}}</h3>
    </div>
    <p>
      <button (click)="logout()">Logout</button>
    </p>
  `,
})
export class HomeViewComponent {
  users;

  constructor(private http: HttpClient, private _loginService: LoginService) {
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe(res => this.users = res)
  }

  public logout() {
    this._loginService.doLogout().then(() => {
      console.log("Logged out");
    });
  }
}