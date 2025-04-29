import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {Appoinment} from '../models/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentsService {

  constructor(private firestore: Firestore) { }

  addAppoinment(appoinment: Appoinment) {
    const appoinmentRef = collection(this.firestore, 'appointments');
    return addDoc(appoinmentRef, appoinment);
  }
}
