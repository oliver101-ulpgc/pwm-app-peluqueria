import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Faq} from '../models/interfaces.model';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class FaqsService {
  constructor(private firestore: Firestore) {}

  getFaqs(): Observable<Faq[]> {
    return collectionData(collection(this.firestore, 'faqs'), {idField: 'id'}) as Observable<Faq[]>;
  }
}
