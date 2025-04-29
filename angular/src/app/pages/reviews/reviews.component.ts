import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReviewsService} from '../../services/reviews.service';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {CommonModule} from '@angular/common';
import {ReviewComponent} from '../../components/review/review.component';
import {ReviewsGraphComponent} from '../../components/reviews-graph/reviews-graph.component';
import {Review} from '../../models/interfaces.model';
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
  graphData: any = {meta: {}, bars: []};

  constructor(private reviewsService: ReviewsService) {}

  private reviewsSubscription?: Subscription;
  private graphDataSubscription?: Subscription;

  ngOnInit() {
    this.reviewsSubscription = this.reviewsService.getReviews().subscribe((data: Review[]) => {
      this.reviews = data;
    });
    this.graphDataSubscription = this.reviewsService.getGraphData().subscribe((data) => {
      this.graphData = data;
    });
  }

  ngOnDestroy() {
    this.reviewsSubscription?.unsubscribe();
    this.graphDataSubscription?.unsubscribe();
  }
}
