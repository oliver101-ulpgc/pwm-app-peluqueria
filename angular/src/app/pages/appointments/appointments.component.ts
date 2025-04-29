import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {AppointmentsService} from '../../services/appoinments.service';
import {Appointment, Portfolio} from '../../models/interfaces.model';

@Component({
  selector: 'appointments-component',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})

export class AppointmentsComponent implements OnInit{

  appoinments: Appointment[] = [];

  constructor(private appointmentService: AppointmentsService) {}

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (appointment: Appointment[]) => {
        this.appoinments = appointment;
      },
    });
  }
}
