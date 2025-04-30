import { Injectable } from '@angular/core';
import {collection, Firestore, getDocs} from '@angular/fire/firestore';
import {Hairdresser} from '../models/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class HairdressersService {

  constructor(private firestore: Firestore) { }

  async getHairdressers(): Promise<Hairdresser[]> {
    const querySnapshot = await getDocs(collection(this.firestore, 'hairdressers'));
    const hairdressers: Hairdresser[] = [];
    querySnapshot.forEach((doc) => {
      hairdressers.push({ id: doc.id, ...doc.data() } as Hairdresser);
    });
    return hairdressers;
  }
}
