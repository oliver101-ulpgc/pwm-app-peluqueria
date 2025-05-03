import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppointmentsService} from '../../services/appoinments.service';
import {Appointment} from '../../models/interfaces.model';
import {AuthService} from '../../services/auth.service';
import {firstValueFrom, Observable} from 'rxjs';
import {User} from '@angular/fire/auth';

@Component({
  selector: 'appointments-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {

  appointments: Appointment[] = [];
  upcomingAppointments: Appointment[] = [];
  pastAppointments: Appointment[] = [];
  private authService = inject(AuthService);
  authState$ = this.authService.authState$;
  protected currentUser$: Observable<User | null> = this.authState$;
  private currentUserId: string | null = null;

  constructor(private appointmentService: AppointmentsService) {}

  async ngOnInit(): Promise<void> {
    const user = await firstValueFrom(this.currentUser$);

    if (user == null) {
      return;
    }
    this.currentUserId = user.uid;

    this.appointmentService.getAppointments(user.uid).subscribe({
      next: (appointments: Appointment[]) => {
        const now = new Date();

        const processedAppointments = appointments.map(a => {
          const appointmentDate = a.date;
          return {...a, date: appointmentDate};
        });

        this.upcomingAppointments = processedAppointments.filter(a => {
          return a.date > now;
        });

        this.pastAppointments = processedAppointments.filter(a => {
          return a.date <= now;
        });
      },
    });
  }

  async cancelAppointment(appointment: Appointment) {
    if (!this.currentUserId) {
      alert('No se puede cancelar la cita: usuario no identificado.');
      return;
    }

    try {
      await this.appointmentService.cancelAppointmentForUser(this.currentUserId, appointment);
      // Eliminamos la cita del array local para actualizar la vista
      this.upcomingAppointments = this.upcomingAppointments.filter(a => a !== appointment);
      alert('Cita cancelada correctamente.');
    } catch (error) {
      console.error('Error al cancelar la cita:', error);
      alert('Hubo un problema al cancelar la cita. Inténtalo de nuevo.');
    }
  }
}
