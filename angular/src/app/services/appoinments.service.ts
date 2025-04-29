import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {addDoc, collection, collectionData, Firestore} from '@angular/fire/firestore';
import {Appointment} from '../models/interfaces.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private firestore: Firestore) { }

  addAppointment(appointment: Appointment) {
    const appointmentRef = collection(this.firestore, 'appointments');
    return addDoc(appointmentRef, appointment);
  }

  getAppointments(){
    const appointmentRef = collection(this.firestore, 'appointments');
    return collectionData(appointmentRef, {idField: 'id'}) as Observable<Appointment[]>
  }
}
