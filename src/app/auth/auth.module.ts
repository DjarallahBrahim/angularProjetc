import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { RegisterComponent}from './register/register.component'
import { AuthComponent }from './auth.component';

import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guerd';
import { TokenInterceptor} from './shared/interceptor';
const appRoutes: Routes = [
  { path : 'login' , component:LoginComponent, canActivate:[AuthGuard]},
  { path : 'register' ,component: RegisterComponent, canActivate:[AuthGuard]}
];
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  imports: [
    RouterModule.forChild(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [AuthService,AuthGuard,
              {
                provide: HTTP_INTERCEPTORS,
                useClass:TokenInterceptor,
                multi: true

              }],
})
export class AuthModule { }
