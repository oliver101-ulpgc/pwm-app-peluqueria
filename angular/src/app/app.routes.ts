import { RouterModule, Routes } from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonPageComponent} from '../assets/common_component/common_page/common_page';

export const routes: Routes = [
  { path: '', component: CommonPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
