import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Review} from '../models/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private http: HttpClient) { }

  getReviews(): Observable<Review[]> {
    return this.http.get<{data: Review[]}>('/assets/data/reviews.json').pipe(
      map(response => response.data),
    );
  }

  getGraphData(): Observable<Review[]> {
    return this.http.get<{data: Review[]}>('/assets/data/reviews-graph.json').pipe(
      map(response => response.data),
    );
  }
}

