import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {Review} from '../models/interfaces.model';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private firestore: Firestore, private http: HttpClient) { }

  getReviews(): Observable<Review[]> {
    return collectionData(collection(this.firestore, 'reviews'), {idField: 'id'}) as Observable<Review[]>;
  }

  getGraphData(): Observable<any> {

    return this.http.get<{data: any}>('/assets/data/reviews-graph.json');
  }
}

