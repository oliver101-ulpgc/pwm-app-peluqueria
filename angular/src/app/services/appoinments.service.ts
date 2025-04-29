import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {addDoc, collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Appoinment} from '../models/interfaces.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppoinmentsService {

  constructor(private firestore: Firestore) { }

  addAppointment(appoinment: Appoinment) {
    const appointmentRef = collection(this.firestore, 'appointments');
    return addDoc(appointmentRef, appoinment);
  }

  getAppointments(){
    const appointmentRef = collection(this.firestore, 'appointments');
    return collectionData(appointmentRef, {idField: 'id'}) as Observable<Appoinment[]>
  }
}
