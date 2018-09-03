import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Rental } from '../../../shared/rental.modele';
import { Booking } from '../../../booking/shared/booking.modele';
import { HelperService } from '../../../common/service/helper.service';
import { BookingService  } from '../../../booking/shared/booking.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import * as moment from 'moment';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;

  newBookin: Booking;
  modelRef: any;
  errors: any[] = [];

  public daterange: any = {};
  bookedOutDates: any[] = [];


  public options: any = {
      locale: { format: Booking.DATE_FORMAT },
      alwaysShowCalendars: false,
      opens: 'left',
      isInvalidDate: this.chekInvalideDate.bind(this)
      };
  constructor(private helper: HelperService,
              private modalService: NgbModal,
              private bookingService: BookingService,
              private toast: ToastsManager,
              vcr: ViewContainerRef) {
                this.toast.setRootViewContainerRef(vcr);
              }

  ngOnInit() {
    this.newBookin = new Booking();
    this.getBookedOutDates();
  }

  private chekInvalideDate(date) {
    return this.bookedOutDates.includes(this.helper.getBookingDateFormat(date)) || date.diff(moment(), 'days') < 0 ;
  }
  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;
    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const rang =  this.helper.getBookingRandOFDate(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...rang);
      });
    }
  }

  private addNewBookedDates(bookingData: any){
    const rang =  this.helper.getBookingRandOFDate(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...rang);

  }

  openConfirmModal(content) {
    this.errors = [];
   this.modelRef = this.modalService.open(content);
  }

  createBooking() {
    this.newBookin.rental = this.rental;
    this.bookingService.creatBooking(this.newBookin).subscribe(
      (bookingData: any) => {
        this.addNewBookedDates(bookingData);
        this.newBookin = new Booking();
        this.modelRef.close();
        this.toast.success('Booking has been succesfuly created, Check your booking detail in manager section', 'Success!');

      },
      (errorsRespens: any) => {
        this.errors = errorsRespens.error.errors;
    });
  }


  public selectedDate(value: any, datepicker?: any) {

       this.newBookin.startAt = this.helper.getBookingDateFormat(value.start);
       this.newBookin.endAt = this.helper.getBookingDateFormat(value.end);
       this.newBookin.days = -(value.start.diff(value.end, 'days'));
       this.newBookin.totalPrice = this.newBookin.days * this.rental.dailyRate;
   }

}
