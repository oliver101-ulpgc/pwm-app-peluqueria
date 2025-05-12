import {Injectable} from '@angular/core';
import {Service} from '../models/interfaces.model';
import {catchError, firstValueFrom, map, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http: HttpClient, private firestore: Firestore) { }

  getServices(){
    const serviceRef = collection(this.firestore, 'services');
    return collectionData(serviceRef, { idField: 'id' }) as Observable<Service[]>;
  }

  getServiceById(id: string): Observable<Service | undefined> {
    return this.getServices().pipe(
      map(services => services.find(s => s.id === id))
    );
  }


}
