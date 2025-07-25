import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ReservationList } from './reservation-list/reservation-list';
import { ReservationForm } from './reservation-form/reservation-form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'list', component: ReservationList },
  { path: 'new', component: ReservationForm },
  { path: 'edit/:id', component: ReservationForm },
];
