import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  constructor(private http: HttpClient) { }

  getReviews(): Observable<any> {
    return this.http.get('/assets/data/reviews.json');
  }

  getGraphData(): Observable<any> {
    return this.http.get('/assets/data/reviews-graph.json');
  }
}

