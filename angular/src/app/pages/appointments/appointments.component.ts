import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {AppointmentsService} from '../../services/appoinments.service';
import {Appointment, Portfolio} from '../../models/interfaces.model';
import {AuthService} from '../../services/auth.service';
import {firstValueFrom, Observable} from 'rxjs';
import {User} from '@angular/fire/auth';

@Component({
  selector: 'appointments-component',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})

export class AppointmentsComponent implements OnInit{

  appoinments: Appointment[] = [];
  private authService = inject(AuthService);
  authState$ = this.authService.authState$;
  protected currentUser$: Observable<User | null> = this.authState$;

  constructor(private appointmentService: AppointmentsService) {}

  async ngOnInit(): Promise<void> {
    const user = await firstValueFrom(this.currentUser$);
    if (user == null){
      return;
    }
    this.appointmentService.getAppointments(user.uid).subscribe({
      next: (appointment: Appointment[]) => {
        this.appoinments = appointment;
      },
    });
  }
}
