import { Injectable } from '@angular/core';
import {collection, collectionData, Firestore, getDocs} from '@angular/fire/firestore';
import {Hairdresser} from '../models/interfaces.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HairdressersService {

  constructor(private firestore: Firestore) { }

  getHairdressers(): Observable<Hairdresser[]> {
    return collectionData(collection(this.firestore, 'hairdressers')) as Observable<Hairdresser[]>;
  }
}
