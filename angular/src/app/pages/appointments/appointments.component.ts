import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonPageComponent} from '../../components/common_page/common_page';

@Component({
  selector: 'appointments-component',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})

export class AppointmentsComponent {

}
