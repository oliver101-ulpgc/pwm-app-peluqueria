import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonPageComponent} from '../../components/common_page/common_page';

@Component({
  selector: 'booking-component',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})

export class BookingComponent {
  peluqueroSeleccionado: string | null = null;
  fechaSeleccionada: string | null = null;
  horaSeleccionada: string | null = null;
  horasDisponibles: string[] = [];

  @ViewChild('peluqueroSeleccionado', { static: true }) peluqueroSeleccionadoEl!: ElementRef;
  @ViewChild('fechaSeleccionada', { static: true }) fechaSeleccionadaEl!: ElementRef;
  @ViewChild('horas', { static: true }) horasEl!: ElementRef;

  seleccionarPeluquero(id: string) {
    this.peluqueroSeleccionado = id;
    this.peluqueroSeleccionadoEl.nativeElement.innerText = `Peluquero ${id} seleccionado`;
    this.resetHoraSeleccionada();
  }

  cargarHoras(event: Event) {
    this.fechaSeleccionada = (event.target as HTMLInputElement).value;
    this.fechaSeleccionadaEl.nativeElement.innerText = this.fechaSeleccionada ? `Fecha: ${this.fechaSeleccionada}` : "Selecciona una fecha";

    // Simulación de horas disponibles
    this.horasDisponibles = ["10:00", "11:00", "12:00", "14:00", "15:00"];
    this.renderizarHoras();
  }

  renderizarHoras() {
    this.horasEl.nativeElement.innerHTML = "";
    this.horasDisponibles.forEach(hora => {
      const div = document.createElement("div");
      div.className = "hour";
      div.innerText = hora;
      div.onclick = () => this.seleccionarHora(div, hora);
      this.horasEl.nativeElement.appendChild(div);
    });
  }

  seleccionarHora(div: HTMLDivElement, hora: string) {
    this.resetHoraSeleccionada();
    div.classList.add('selected');
    this.horaSeleccionada = hora;
  }

  resetHoraSeleccionada() {
    this.horaSeleccionada = null;
    document.querySelectorAll('.hour').forEach(el => el.classList.remove('selected'));
  }

  confirmarReserva() {
    if (!this.peluqueroSeleccionado || !this.fechaSeleccionada || !this.horaSeleccionada) {
      alert("Por favor, selecciona un peluquero, una fecha y una hora.");
      return;
    }
    alert(`Reserva confirmada para Peluquero ${this.peluqueroSeleccionado} el ${this.fechaSeleccionada} a las ${this.horaSeleccionada}.`);
  }
}
