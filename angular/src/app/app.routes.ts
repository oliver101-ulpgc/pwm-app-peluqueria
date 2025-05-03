import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './pages/home/home.component';
import {PortfolioComponent} from './pages/portfolio/portfolio.component';
import {DetailsComponent} from './pages/details/details.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {BookingComponent} from './pages/booking/booking.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {LogInComponent} from './pages/log-in/log-in.component';
import {PoliciesComponent} from './pages/policies/policies.component';
import {AppointmentsComponent} from './pages/appointments/appointments.component';
import {FaqComponent} from './pages/faq/faq.component';
import {privateGuard, publicGuard} from './core/auth.guard';
import {MyProfileComponent} from './pages/my-profile/my-profile.component';
import {CommonPageComponent} from './components/common_page/common_page';

export const routes: Routes = [
  {path: 'sign-up', component: SignUpComponent, canActivate: [publicGuard]},
  {path: 'log-in', component: LogInComponent, canActivate: [publicGuard]},
  {
    path: '', component: CommonPageComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'booking/:serviceId', component: BookingComponent, canActivate: [privateGuard]},
      {path: 'appointments', component: AppointmentsComponent, canActivate: [privateGuard]},
      {path: 'reviews', component: ReviewsComponent},
      {path: 'portfolio', component: PortfolioComponent},
      {path: 'details', component: DetailsComponent},
      {path: 'policies', component: PoliciesComponent},
      {path: 'faq', component: FaqComponent},
      {path: 'myprofile', component: MyProfileComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
