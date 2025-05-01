import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, doc, deleteDoc, Firestore} from '@angular/fire/firestore';
import {Appointment} from '../models/interfaces.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private firestore: Firestore) { }

  async addAppointmentForUser(uid: string, appointment: Appointment) {
    const appointmentRef = collection(this.firestore, `clients/${uid}/appointments`);
    return await addDoc(appointmentRef, appointment);
  }

  getAppointments(uid: string){
    const appointmentRef = collection(this.firestore, `clients/${uid}/appointments`);
    return collectionData(appointmentRef, {idField: 'id'}) as Observable<Appointment[]>
  }

  cancelAppointmentForUser(uid: string, appointment: Appointment) {
    const appointmentDocRef = doc(this.firestore, `clients/${uid}/appointments/${appointment.id}`);
    return deleteDoc(appointmentDocRef);
  }
}
