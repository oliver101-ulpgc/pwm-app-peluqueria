import {Injectable} from '@angular/core';
import {catchError, forkJoin, from, map, Observable, of, switchMap} from 'rxjs';
import {Review} from '../models/interfaces.model';
import {collection, collectionData, DocumentReference, Firestore, getDoc} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';

interface FirestoreReviewClient {
  id: string,
  photoURL: string,
  username: string,
}

interface FirestoreReview {
  id: string
  clientId: DocumentReference,
  stars: number,
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private firestore: Firestore, private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return collectionData(collection(this.firestore, 'reviews'), {idField: 'id'})
      .pipe(
        switchMap((reviews: any[]) => {
            const reviewsWithClients$: Observable<Review>[] = reviews.map(
              (review) => this.addClientToReview(review)
            );
            return forkJoin<Review[]>(reviewsWithClients$);
          }
        )
      );
  }

  getGraphData(): Observable<any> {
    // TODO: use firestore
    return this.http.get<{ data: any }>('/assets/data/reviews-graph.json');
  }

  private addClientToReview(review: FirestoreReview): Observable<Review> {
    return from(getDoc(review.clientId))
      .pipe(
        map((clientSnapshot) => {
          return clientSnapshot.exists()
            ? this.makeReviewWithClient(review, clientSnapshot.data() as FirestoreReviewClient)
            : this.makeReviewWithoutClient(review, 'client not found');
        }),
        catchError(() => {
          return of(this.makeReviewWithoutClient(review, 'error loading client'));
        })
      );
  }

  private makeReviewWithClient(review: FirestoreReview, client: FirestoreReviewClient): Review {
    return {
      id: review.id,
      text: review.text,
      stars: review.stars,
      client: {
        id: client.id,
        username: client.username,
        image: client.photoURL
      }
    };
  }

  private makeReviewWithoutClient(review: FirestoreReview, clientUsername: string): Review {
    return {
      id: review.id,
      text: review.text,
      stars: review.stars,
      client: {
        id: '',
        username: clientUsername,
        image: ''
      }
    };
  }
}

