import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonPageComponent} from '../../components/common_page/common_page';

@Component({
  selector: 'booking-component',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})

export class BookingComponent {}
