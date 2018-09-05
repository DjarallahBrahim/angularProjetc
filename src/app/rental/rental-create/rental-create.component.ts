import { Component, OnInit } from '@angular/core';
import { Rental } from '../../shared/rental.modele';
import { RentalService } from '../../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental: Rental;
  rentalCategorie = Rental.CATEGORIES;
  errors: any[] = [];

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }


  creatRental(){
    this.rentalService.creatRental(this.newRental).subscribe(
      () => {

      },
      (errRespons: HttpErrorResponse) => {
        this.errors = errRespons.error.errors;
      });
  }
  uploadImage(){
    this.newRental.image = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg"
  }

}
