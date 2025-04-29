import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Portfolio, Service} from '../../models/interfaces.model';
import {map, Observable} from 'rxjs';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService {

  constructor(private http: HttpClient, private firestore: Firestore) { }

  getImages(){
    const serviceRef = collection(this.firestore, 'portfolio');
    return collectionData(serviceRef, { idField: 'id' }) as Observable<Portfolio[]>;
  }

}
