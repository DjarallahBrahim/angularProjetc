import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {NgPipesModule} from 'ngx-pipes';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';

import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';


import { RentalService } from '../shared/rental.service';
import { HelperService } from '../common/service/helper.service';
import { BookingService } from '../booking/shared/booking.service';


import { MapModule } from '../common/map/map.module';
import { AuthGuard } from '../auth/shared/auth.guerd';

const appRoutes: Routes = [
  { path : 'rentals' ,
    component : RentalComponent,
    children: [
      { path : '' , component: RentalListComponent},
      { path : 'new' , component: RentalCreateComponent, canActivate: [AuthGuard]},
      { path : ':renalID' , component: RentalDetailComponent, canActivate: [AuthGuard]},
      { path : ':city/home' , component: RentalSearchComponent}
    ]}
];

@NgModule({
  declarations: [ RentalComponent,
  RentalListComponent,
  RentalListItemComponent,
  RentalDetailComponent,
  RentalDetailBookingComponent,
  RentalSearchComponent,
  RentalCreateComponent,

],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule
  ],
  providers: [RentalService,
              HelperService,
              BookingService],

})
export class RentalModule { }
