import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonPageComponent } from '../../components/common_page/common_page';
import { AppointmentsService } from '../../services/appoinments.service';
import { HairdressersService } from '../../services/hairdressers.service';
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
  imports: [CommonModule, CommonPageComponent, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit, OnDestroy {
  private appointmentsService = inject(AppointmentsService);
  private hairdressersService = inject(HairdressersService);
  private hairdressersSubscription?: Subscription;
  private homeService = inject(HomeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  authState$ = this.authService.authState$;
  protected currentUser$: Observable<User | null> = this.authState$;
  service: string | null = null;

  hairdressers: Hairdresser[] = [];
  peluqueroSeleccionado: string | null = null;
  fechaSeleccionada: string | null = null;
  horaSeleccionada: string | null = null;
  horasDisponibles: string[] = [];

  async ngOnInit() {
    this.service = this.route.snapshot.paramMap.get('serviceId');
    this.hairdressersSubscription = this.hairdressersService.getHairdressers().subscribe(data => {
      this.hairdressers = data;
    });
  }

  ngOnDestroy(): void {
    this.hairdressersSubscription?.unsubscribe();
  }

  seleccionarPeluquero(id: string) {
    this.peluqueroSeleccionado = id;
    const selected = this.hairdressers.find(h => h.id === id);
    this.horasDisponibles = selected?.hours || [];
    this.horaSeleccionada = null; // reinicia hora
  }

  cargarHoras(event: Event) {
    this.fechaSeleccionada = (event.target as HTMLInputElement).value;
    this.horaSeleccionada = null; // reinicia hora
  }

  async confirmarReserva() {
    if (!this.peluqueroSeleccionado || !this.fechaSeleccionada || !this.horaSeleccionada) {
      alert("Por favor, selecciona un peluquero, una fecha y una hora.");
      return;
    }

    const user = await firstValueFrom(this.currentUser$);
    if (user == null){
      alert('Debes iniciar sesión para reservar.');
      return;
    }

    if (this.service == null){
      alert('Debes elegir un servicio para reservar.');
      return;
    }

    const peluquero = this.hairdressers.find(h => h.id === this.peluqueroSeleccionado);
    const nombrePeluquero = peluquero?.name || 'desconocido';
    const servicioObj = await firstValueFrom(this.homeService.getServiceById(this.service));
    const nombreServicio = servicioObj?.title || 'desconocido';
    const fechaHoraStr = `${this.fechaSeleccionada}T${this.horaSeleccionada}`;

    const appointment: Appointment = {
      hairdresser: nombrePeluquero,
      date: new Date(fechaHoraStr),
      service: nombreServicio
    };

    try {
      await this.appointmentsService.addAppointmentForUser(user.uid, appointment);
      alert(`Reserva confirmada para ${nombreServicio} con el peluquero ${nombrePeluquero}, el ${this.fechaSeleccionada} a las ${this.horaSeleccionada}.`);
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
      alert('Hubo un problema al guardar la reserva. Inténtalo de nuevo.');
    }
  }
}
