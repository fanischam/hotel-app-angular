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
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.reservationForm = this.formbuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });
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
      this.reservationService.createReservation({
        id: Date.now().toString(), // Generate a unique ID
        ...this.reservationForm.value,
      });
      console.log('Reservation created:', this.reservationForm.value);
    }
  }
}
