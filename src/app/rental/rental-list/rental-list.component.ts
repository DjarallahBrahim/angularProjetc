import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../shared/rental.service';
import { Rental } from '../../shared/rental.modele';

@Component({
  selector: 'bwm-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {
  rentals: Rental[]=[];

  constructor(private rentalService :RentalService ) {
  }

  ngOnInit() {
    /* create subscribe of  Observer  */

    const rentalObserver = this.rentalService.getRentals() ;

    rentalObserver.subscribe(
      (data:Rental[])=>{
        this.rentals = data;
      },
      (err)=>{

      },
      ()=>{

      }
    );
    //this.rentals = this.rentalService.getRentals();

  }

}
