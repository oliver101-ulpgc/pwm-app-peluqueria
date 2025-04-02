import { Component } from '@angular/core';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {CommonModule} from '@angular/common';
import {Reviews} from '../../models/interfaces.model'

@Component({
  selector: 'review-component',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  reviews: Reviews[] = [];
}
