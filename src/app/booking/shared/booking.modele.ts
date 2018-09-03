import { Rental } from '../../shared/rental.modele';

export class Booking {
  static DATE_FORMAT = 'Y-MM-DD';
  _id: string;
  startAt: string;
  endAt: string;
  totalPrice: number;
  guests: number;
  days: number;
  createdAt: string;
  rental: Rental;

}
