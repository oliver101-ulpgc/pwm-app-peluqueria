import {inject, Injectable, OnInit} from "@angular/core";
import {DbService} from "./db.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {FirestoreService, Service} from "../models/service.model";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AppServicesService {
  private dbService = inject(DbService);
  private firestore = inject(Firestore);
  private services$ = new BehaviorSubject<Service[]>([]);

  constructor() {
    this.init().then();
  }

  private async init() {
    this.services$.next(await this.dbService.getAllServices());
    console.log('Servicios locales:', this.services$.value);
    this.handleSyncingFromFirestore().then();
    // hacer que cada vez que cambie services$ se escriba de nuevo en local
    // TODO
  }

  private async handleSyncingFromFirestore() {
    (collectionData(collection(this.firestore, 'services'), {idField: 'id'}) as Observable<FirestoreService[]>)
      .subscribe(
        (services: FirestoreService[]) => {
          // En caso de no conseguir servicios, quedarse con lo que hay en local
          if (services.length === 0) return;
          const servicesFromFirestore: Service[] = services.map(
            service => {
              return {...service, isFavorite: false}
            }
          );
          this.services$.value.forEach(
            (localService: Service) => {
              const service = servicesFromFirestore.find(s => s.id === localService.id);
              if (service === undefined) return;
              service.isFavorite = localService.isFavorite;
            }
          );
          this.services$.next(servicesFromFirestore);
        }
      );
  }

  getServices(): Observable<Service[]> {
    return this.services$.asObservable();
  }

  getService(id: string): Observable<Service | undefined> {
    return this.services$.asObservable().pipe(
      map(services => services.find(s => s.id === id))
    );
  }

  updateServiceIsFavorite(id: string, isFavorite: boolean) {
    const services: Service[] = this.services$.value.map(
      service => id === service.id
        ? {...service, isFavorite: isFavorite}
        : service
    );
    this.services$.next(services);
  }
}
