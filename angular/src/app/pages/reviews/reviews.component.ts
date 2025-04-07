import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {CommonModule} from '@angular/common';
import {ReviewComponent} from '../../components/review/review.component';
import {ReviewsGraphComponent} from '../../components/reviews-graph/reviews-graph.component';
import {Review} from '../../models/interfaces.model';

@Component({
  selector: 'reviews-component',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  standalone: true,
  imports: [CommonModule, CommonPageComponent, ReviewComponent, ReviewsGraphComponent]
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  graphData: any = { meta: {}, bars: [] };

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit() {
    this.reviewsService.getReviews().subscribe(data => this.reviews = data);
    this.reviewsService.getGraphData().subscribe(data => this.graphData = data);
  }
}
