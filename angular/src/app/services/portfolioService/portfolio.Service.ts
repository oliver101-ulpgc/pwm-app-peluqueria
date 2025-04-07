import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Portfolio, Service} from '../../models/interfaces.model';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService {
  constructor(private http: HttpClient) {}

  getImages(): Observable<Portfolio[]> {
    return this.http.get<{data: Portfolio[]}>('/assets/data/portfolio.json').pipe(
      map(response => response.data),
    );
  }
}
