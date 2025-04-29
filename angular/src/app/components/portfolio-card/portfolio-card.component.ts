import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'portfolio-card-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './portfolio-card.component.html',
  styleUrl: './portfolio-card.component.css'
})
export class PortfolioCardComponent {
  @Input() item: any;
}
