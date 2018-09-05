import {Injectable} from '@angular/core';
import { Booking } from '../../booking/shared/booking.modele';
import * as moment from 'moment';
@Injectable()
export class HelperService {

  public getBookingRandOFDate(startAt, endAt) {
    return this.getRangeOfDates(startAt, endAt, Booking.DATE_FORMAT);
  }
public getBookingDateFormat(date) {
  return this.formatDate(date, Booking.DATE_FORMAT);
}

private formatDate(date, dateFormat) {
  return moment(date).format(dateFormat);
}

private getRangeOfDates(startAt, endAt, dateForma) {
  const tempDates = [];
  const mEndAt = moment(endAt);
  let mStart = moment(startAt);

  while (mStart < mEndAt) {
    tempDates.push(mStart.format(dateForma));
    mStart = mStart.add(1, 'day');
  }

  tempDates.push(moment(startAt).format(dateForma));
  tempDates.push(mEndAt.format(dateForma));

  return tempDates;
}

}
