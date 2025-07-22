import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation';
import { Reservation } from '../models/reservation';
import { RouterModule } from '@angular/router';
import { Home } from '../home/home';

@Component({
  selector: 'app-reservation-list',
  imports: [RouterModule, Home],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.css',
})
export class ReservationList implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();
  }

  updateReservation(updatedReservation: Reservation): void {
    this.reservationService.updateReservation(updatedReservation);
  }

  deleteReservation(id: string): void {
    this.reservationService.deleteReservation(id);
  }
}
