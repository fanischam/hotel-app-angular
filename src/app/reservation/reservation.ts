import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor() {
    const storedReservations = localStorage.getItem('reservations');
    this.reservations = storedReservations
      ? JSON.parse(storedReservations)
      : [];
  }

  // CRUD operations
  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservationById(id: string): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }

  createReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  updateReservation(updatedReservation: Reservation): void {
    this.reservations = this.reservations.map((res) =>
      res.id === updatedReservation.id ? { ...res, ...updatedReservation } : res
    );
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    const index = this.reservations.findIndex((res) => res.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }
}
