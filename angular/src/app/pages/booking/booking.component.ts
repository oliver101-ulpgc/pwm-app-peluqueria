import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppointmentsService} from '../../services/appoinments.service';
import {HairdressersService} from '../../services/hairdressers.service';
import {Appointment, Hairdresser} from '../../models/interfaces.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {firstValueFrom, Observable, Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {User} from '@angular/fire/auth';
import {HomeService} from '../../services/homeService/home.Service';

@Component({
  selector: 'booking-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit, OnDestroy {
  service: string | null = null;
  hairdressers: Hairdresser[] = [];
  selectedHairdresserId: string | null = null;
  selectedDate: string | null = null;
  selectedHour: string | null = null;
  availableHours: string[] = [];
  private appointmentsService = inject(AppointmentsService);
  private hairdressersService = inject(HairdressersService);
  private hairdressersSubscription?: Subscription;
  private homeService = inject(HomeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  authState$ = this.authService.authState$;
  protected currentUser$: Observable<User | null> = this.authState$;

  async ngOnInit() {
    this.service = this.route.snapshot.paramMap.get('serviceId');
    this.hairdressersSubscription = this.hairdressersService.getHairdressers().subscribe(data => {
      this.hairdressers = data;
    });
  }

  ngOnDestroy(): void {
    this.hairdressersSubscription?.unsubscribe();
  }

  selectHairdresser(id: string) {
    this.selectedHairdresserId = id;
    const selected = this.hairdressers.find(h => h.id === id);
    this.availableHours = selected?.hours || [];
    this.selectedHour = null; // reinicia hora
  }

  loadHour(event: Event) {
    this.selectedDate = (event.target as HTMLInputElement).value;
    this.selectedHour = null; // reinicia hora
  }

  async confirmBooking() {
    if (!this.selectedHairdresserId || !this.selectedDate || !this.selectedHour) {
      alert("Por favor, selecciona un peluquero, una fecha y una hora.");
      return;
    }

    const user = await firstValueFrom(this.currentUser$);
    if (user == null) {
      alert('Debes iniciar sesión para reservar.');
      return;
    }

    if (this.service == null) {
      alert('Debes elegir un servicio para reservar.');
      return;
    }

    const peluquero = this.hairdressers.find(h => h.id === this.selectedHairdresserId);
    const nombrePeluquero = peluquero?.name || 'desconocido';
    const servicioObj = await firstValueFrom(this.homeService.getServiceById(this.service));
    const nombreServicio = servicioObj?.title || 'desconocido';
    const fechaHoraStr = `${this.selectedDate}T${this.selectedHour}`;
    const now = new Date();

    if (new Date(fechaHoraStr) <= now) {
      alert("Por favor, selecciona una fecha y hora futuras.");
      return;
    }

    const appointment: Appointment = {
      hairdresser: nombrePeluquero,
      date: new Date(fechaHoraStr),
      service: nombreServicio
    };

    try {
      await this.appointmentsService.addAppointmentForUser(user.uid, appointment);
      alert(`Reserva confirmada para el servicio ${nombreServicio} con el peluquero ${nombrePeluquero}, el ${this.selectedDate} a las ${this.selectedHour}.`);
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
      alert('Hubo un problema al guardar la reserva. Inténtalo de nuevo.');
    }
  }
}
