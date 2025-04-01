import { Component } from '@angular/core';
import {CommonPageComponent} from '../../assets/common_component/common_page/common_page';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'review-component',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

}
