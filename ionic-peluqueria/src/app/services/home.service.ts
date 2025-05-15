import {Injectable, OnInit} from '@angular/core';
import {Service} from '../models/interfaces.model';
import {map, Observable} from 'rxjs';
import {collection, collectionData, Firestore} from '@angular/fire/firestore';
import {DbService} from "./db.service";
import {Capacitor} from "@capacitor/core";

@Injectable({
  providedIn: 'root'
})

export class HomeService{

  constructor(private firestore: Firestore, private dbService: DbService) { }

  getServices() {
    console.log(this.dbService.platform)
    if (this.dbService.platform === 'web') {
      // Si estamos en la web, obtener desde Firebase
      const serviceRef = collection(this.firestore, 'services');
      return collectionData(serviceRef, { idField: 'id' }) as Observable<Service[]>;
    } else {
      // Si es Android (nativa), obtener desde SQLite o LocalStorage
      console.log("Native")
      return new Observable<Service[]>(observer => {
        // Primero obtenemos los servicios desde SQLite
        this.dbService.getAllServices().then(services => {
          if (services.length === 0) {
            console.log("length=0")
            this.dbService.syncFirebaseToSQLite().then(() => {
              this.dbService.getAllServices().then(updatedServices => {
                observer.next(updatedServices);
                observer.complete();
              }).catch(err => {
                observer.error(err);
              });
            }).catch(err => {
              observer.error(err);
            });
          } else {
            // Si ya hay servicios en SQLite, los retornamos directamente
            observer.next(services);
            observer.complete();
          }
        }).catch(err => {
          observer.error(err);
        });
      });
    }
  }

  getServiceById(id: string): Observable<Service | undefined> {
    return this.getServices().pipe(
      map(services => services.find(s => s.id === id))
    );
  }


}
