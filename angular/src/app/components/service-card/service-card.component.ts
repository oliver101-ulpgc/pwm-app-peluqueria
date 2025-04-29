import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'service-card-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  @Input() services: any;
  protected readonly window = window;
}
