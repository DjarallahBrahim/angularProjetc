import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent}from './register/register.component'

import { AuthService } from './shared/auth.service'
const appRoutes: Routes = [
  { path : 'login' , component:LoginComponent},
  { path : 'register' ,component: RegisterComponent}
];
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [AuthService],
})
export class AuthModule { }