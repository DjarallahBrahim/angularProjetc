import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../../shared/rental.service';
import { Rental } from '../../shared/rental.modele';

@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {
  currentId : string;
  rental: Rental;
  constructor(private routeInformation : ActivatedRoute, private rentalService : RentalService) { }

  ngOnInit() {
    this.routeInformation.params.subscribe(
      (param)=>{
        this.currentId = param['renalID'];
        this.getRentalByid(param['renalID']);
      }
    );
  }

  getRentalByid(rentalId : string){
     this.rentalService.getRentalById(rentalId).subscribe(
       (rental : Rental) => {
         this.rental = rental;
       }
     );
  }

}
