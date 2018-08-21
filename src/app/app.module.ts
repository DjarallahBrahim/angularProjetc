import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalComponent } from './rental/rental.component';
import { Routes, RouterModule } from '@angular/router';

import { RentalModule } from './rental/rental.module';


const appRoutes: Routes = [
  {path : '' , redirectTo : '/rentals', pathMatch:'full'},
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    RentalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
