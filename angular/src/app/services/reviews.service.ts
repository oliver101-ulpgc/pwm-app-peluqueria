import {Injectable} from '@angular/core';
import {catchError, combineLatest, forkJoin, from, map, Observable, of, switchMap} from 'rxjs';
import {Review, ReviewGraphData} from '../models/interfaces.model';
import {collection, collectionData, doc, docData, DocumentReference, Firestore, getDoc} from '@angular/fire/firestore';

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

interface FirestoreGraphBar {
  stars: number,
  count: number
}

interface FirestoreGraphData {
  average_rating: number,
  total_reviews: number
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private firestore: Firestore) {}

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

  getGraphData(): Observable<ReviewGraphData> {
    const graphData$ = docData(doc(this.firestore, 'reviews-graph/data')) as Observable<FirestoreGraphData>;
    const bars$ = collectionData(collection(this.firestore, 'reviews-graph/data/bars')) as Observable<FirestoreGraphBar[]>;
    return combineLatest([graphData$, bars$])
      .pipe(
        map(([meta, bars]) => (
          {
            bars: bars,
            meta: meta
          } as ReviewGraphData
        ))
      );
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

  private makeReviewWithoutClient(review: FirestoreReview, usernameToDisplay: string): Review {
    return {
      id: review.id,
      text: review.text,
      stars: review.stars,
      client: {
        id: '',
        username: usernameToDisplay,
        image: ''
      }
    };
  }
}

