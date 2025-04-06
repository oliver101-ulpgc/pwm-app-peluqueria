import {Injectable} from '@angular/core';
import {Service} from '../../models/interfaces.model';
import {catchError, map, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  private servicesUrl = "/assets/data/data.json";
  constructor(private http: HttpClient) { }

  getServices(): Observable<Service[]> {
    return this.http.get<{ data: Service[] }>('/assets/data/data.json').pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error loading services:', error);
        return of([]); // Devuelve array vacío si hay error
      })
    );
  }


}
