import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css',
})
export class ReservationForm implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formbuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.reservationForm = this.formbuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      const reservation = this.reservationService.getReservationById(id);
      if (reservation) {
        this.reservationForm.patchValue({
          checkInDate: reservation.checkInDate,
          checkOutDate: reservation.checkOutDate,
          guestName: reservation.guestName,
          email: reservation.email,
          roomNumber: reservation.roomNumber,
        });
      } else {
        console.error('Reservation not found');
      }
    }
  }

  get checkInDate() {
    return this.reservationForm.get('checkInDate') as FormControl;
  }

  get checkOutDate() {
    return this.reservationForm.get('checkOutDate') as FormControl;
  }

  get guestName() {
    return this.reservationForm.get('guestName') as FormControl;
  }

  get email() {
    return this.reservationForm.get('email') as FormControl;
  }

  get roomNumber() {
    return this.reservationForm.get('roomNumber') as FormControl;
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      if (this.activatedRoute.snapshot.paramMap.get('id')) {
        // Update existing reservation
        const id = this.activatedRoute.snapshot.paramMap.get('id')!;
        this.reservationService.updateReservation({
          id,
          ...this.reservationForm.value,
        });
        console.log('Reservation updated:', this.reservationForm.value);
      } else {
        // Create new reservation
        this.reservationService.createReservation({
          id: Date.now().toString(), // Generate a unique ID
          ...this.reservationForm.value,
        });
        console.log('Reservation created:', this.reservationForm.value);
        this.router.navigate(['/list']);
      }
    }
  }
}
