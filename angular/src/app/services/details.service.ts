import { Injectable } from '@angular/core';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Details} from '../models/interfaces.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private firestore: Firestore) { }

  getDetails(){
    const detailsRef = collection(this.firestore, `details`);
    return collectionData(detailsRef) as Observable<Details[]>
  }

}
