import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonPageComponent } from '../../components/common_page/common_page';
import { AppointmentsService } from '../../services/appoinments.service';
import { HairdressersService } from '../../services/hairdressers.service';
import { Hairdresser } from '../../models/interfaces.model';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Subscription} from 'rxjs';

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
  private router = inject(Router);

  hairdressers: Hairdresser[] = [];
  peluqueroSeleccionado: string | null = null;
  fechaSeleccionada: string | null = null;
  horaSeleccionada: string | null = null;
  horasDisponibles: string[] = [];

  ngOnInit() {
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

  confirmarReserva() {
    if (!this.peluqueroSeleccionado || !this.fechaSeleccionada || !this.horaSeleccionada) {
      alert("Por favor, selecciona un peluquero, una fecha y una hora.");
      return;
    }

    const peluquero = this.hairdressers.find(h => h.id === this.peluqueroSeleccionado);
    const nombre = peluquero?.name || 'desconocido';

    alert(`Reserva confirmada con el peluquero ${nombre}, el ${this.fechaSeleccionada} a las ${this.horaSeleccionada}.`);
    // this.appointmentsService.addAppoinment({...})
    this.router.navigateByUrl('/');
  }
}
