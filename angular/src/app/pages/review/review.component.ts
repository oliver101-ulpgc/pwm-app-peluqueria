import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Review} from '../../models/interfaces.model'

@Component({
  selector: 'review-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  reviews: Review[] = [];
}
