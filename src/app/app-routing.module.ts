import { RouterModule, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginViewComponent } from '../views/login/login.component';
import { HomeViewComponent } from '../views/home/home.component';
import { CatalogViewComponent } from '../views/catalog/catalog.component';
import { AppDefaultNavguard } from './app-default.navguard';
import { PermissionService } from './permission.service';
// import { LoginService } from './login.service';

@NgModule({
  declarations: [ 
    LoginViewComponent, HomeViewComponent, CatalogViewComponent
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginViewComponent },
      { path: 'home', component: HomeViewComponent, canActivate: [AppDefaultNavguard] },
      { path: 'catalog', component: CatalogViewComponent, canActivate: [AppDefaultNavguard] },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [AppDefaultNavguard],

})
export class AppRoutingModule {
  constructor(_router:Router, _permissionService: PermissionService){
    // constructor(_router:Router, _permissionService: PermissionService, _loginService: LoginService){

    _permissionService.PermissionState.subscribe((permission) => {
        console.log("Got the permission...");
        if(permission) {
          switch(permission.Role) {
            case "Client" :
              this._router.navigate(["/catalog"]);
            break;
            case "Employee" :
              this._router.navigate(["/home"]);
            break;
            default:
              this._router.navigate(["/login"]);
          }
        }
    });

    // _loginService.AuthState.subscribe((permission) => {
    //     console.log("Loggd out");
    // });
  }
}