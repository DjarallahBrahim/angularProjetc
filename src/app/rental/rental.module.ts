import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {NgPipesModule} from 'ngx-pipes';
import { Daterangepicker } from 'ng2-daterangepicker';

import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalService } from '../shared/rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { MapModule } from '../common/map/map.module';
import { AuthGuard } from '../auth/shared/auth.guerd';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';

const appRoutes: Routes = [
  { path : 'rentals' ,
    component : RentalComponent,
    children:[
      { path : '' , component:RentalListComponent},
      { path : ':renalID' ,component: RentalDetailComponent, canActivate:[AuthGuard]}
    ]}
];

@NgModule({
  declarations:[RentalComponent,
  RentalListComponent,
  RentalListItemComponent,
  RentalDetailComponent,
  RentalDetailBookingComponent,

],
  imports:[
    CommonModule,
    RouterModule.forRoot(appRoutes),
    NgPipesModule,
    MapModule,
    Daterangepicker
  ],
  providers: [RentalService],

})
export class RentalModule { }
