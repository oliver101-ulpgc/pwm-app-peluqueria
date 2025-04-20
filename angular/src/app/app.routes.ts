import { RouterModule, Routes } from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './pages/home/home.component';
import {PortfolioComponent} from './pages/portfolio/portfolio.component';
import {DetailsComponent} from './pages/details/details.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {BookingComponent} from './pages/booking/booking.component';
import {SingUpComponent} from './pages/sing-up/sing-up.component';
import {LogInComponent} from './pages/log-in/log-in.component';
import {PoliciesComponent} from './pages/policies/policies.component';
import {AppointmentsComponent} from './pages/appointments/appointments.component';
import {FaqComponent} from './pages/faq/faq.component';
import {privateGuard, publicGuard} from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'booking', component: BookingComponent, canActivate: [privateGuard] },
  { path: 'sign-up', component: SingUpComponent, canActivate: [publicGuard] },
  { path: 'log-in', component: LogInComponent, canActivate: [publicGuard] },
  { path: 'policies', component: PoliciesComponent },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [privateGuard]},
  { path: 'faq', component: FaqComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
