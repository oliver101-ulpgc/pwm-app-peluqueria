import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ReviewsService} from '../../services/reviews.service';
import {CommonModule} from '@angular/common';
import {ReviewComponent} from '../../components/review/review.component';
import {ReviewsGraphComponent} from '../../components/reviews-graph/reviews-graph.component';
import {Review, ReviewGraphData} from '../../models/interfaces.model';
import {firstValueFrom, Observable, Subscription} from 'rxjs';
import {AuthService, UserProfile} from '../../services/auth.service';
import {User} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'reviews-component',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  standalone: true,
  imports: [CommonModule, ReviewComponent, ReviewsGraphComponent, FormsModule]
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
  userProfile: UserProfile | null = null;
  user: User | null = null;
  public newReviewText: string = '';
  public newReviewStars: number = 0;
  public starsArray = [1, 2, 3, 4, 5];
  private authService = inject(AuthService);
  authState$!: Observable<User | null>;
  protected currentUser$!: Observable<User | null>;
  private graphDataSubscription?: Subscription;
  private reviewsSubscription?: Subscription;

  constructor(private reviewsService: ReviewsService) {}

  async ngOnInit() {
    this.authState$ = this.authService.authState$;
    this.currentUser$ = this.authState$;

    this.reviewsSubscription = this.reviewsService.getReviews().subscribe((data: Review[]) => {
      this.reviews = data;
    });
    this.graphDataSubscription = this.reviewsService.getGraphData().subscribe((data: ReviewGraphData) => {
      this.graphData = data;
    });
    this.user = await firstValueFrom(this.currentUser$);
    if (this.user) {
      this.userProfile = await this.authService.getUserProfile(this.user.uid);
    }
  }

  submitReview() {
    if (!this.newReviewText || !this.newReviewStars) {
      alert('Por favor escribe una reseña y selecciona las estrellas.');
      return;
    }

    if (!this.user) {
      alert('Debes estar logueado para publicar una reseña.');
      return;
    }

    this.reviewsService.addReview({
      text: this.newReviewText,
      stars: this.newReviewStars,
      user: this.user
    }).then(() => {
      // Opcional: limpiar los campos tras publicar
      this.newReviewText = '';
      this.newReviewStars = 0;
      alert('Reseña publicada con éxito ✅');
      // Opcional: volver a cargar las reseñas
      //this.loadReviews();
    }).catch((error) => {
      console.error('Error publicando la reseña:', error);
      alert('Ocurrió un error al publicar la reseña.');
    });
  }


  ngOnDestroy() {
    this.reviewsSubscription?.unsubscribe();
    this.graphDataSubscription?.unsubscribe();
  }
}
