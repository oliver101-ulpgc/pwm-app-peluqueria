import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewsService} from '../../services/reviews.service';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {CommonModule} from '@angular/common';
import {ReviewComponent} from '../../components/review/review.component';
import {ReviewsGraphComponent} from '../../components/reviews-graph/reviews-graph.component';
import {Review, ReviewGraphData} from '../../models/interfaces.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'reviews-component',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  standalone: true,
  imports: [CommonModule, CommonPageComponent, ReviewComponent, ReviewsGraphComponent]
})
export class ReviewsComponent implements OnInit, OnDestroy {
  reviews: Review[] = [];
  graphData: ReviewGraphData = {
    bars: [],
    meta: {
      total_reviews: 0,
      average_rating: 0
    }
  };

  private graphDataSubscription?: Subscription;
  private reviewsSubscription?: Subscription;

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit() {
    this.reviewsSubscription = this.reviewsService.getReviews().subscribe((data: Review[]) => {
      this.reviews = data;
    });
    this.graphDataSubscription = this.reviewsService.getGraphData().subscribe((data: ReviewGraphData) => {
      this.graphData = data;
    });
  }

  ngOnDestroy() {
    this.reviewsSubscription?.unsubscribe();
    this.graphDataSubscription?.unsubscribe();
  }
}
