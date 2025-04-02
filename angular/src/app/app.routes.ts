import { RouterModule, Routes } from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {DetailsComponent} from './details/details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'portfolio', component: PortfolioComponent},
  { path: 'details', component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
