import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Faq} from '../models/interfaces.model';

@Injectable({providedIn: 'root'})
export class FaqsService {
  constructor(private http: HttpClient) {}

  getFaqs(): Observable<Faq[]> {
    return this.http.get<{ data: Faq[] }>('/assets/data/faq.json').pipe(
      map(response => response.data),
    );
  }
}
