import {Component, OnInit} from '@angular/core';
import { CommonPageComponent } from './components/common_page/common_page';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonPageComponent, RouterModule]
})
export class AppComponent{}
