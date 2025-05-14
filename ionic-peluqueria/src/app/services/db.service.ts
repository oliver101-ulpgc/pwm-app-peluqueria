import {inject, Injectable, OnInit} from '@angular/core';
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from "@capacitor-community/sqlite";
import {Service} from "../models/interfaces.model";
import {HomeService} from "./home.service";
import {Capacitor} from "@capacitor/core";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class DbService{

  private db: SQLiteDBConnection | null = null;
  public platform: 'native' | 'web' = Capacitor.getPlatform() === 'web' ? 'web' : 'native';
  private localStorageKey = "todos";
  private firestore =  inject(Firestore);
  private sqlite!: SQLiteConnection;

  constructor() {
    this.init();
  }

  private init() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.initLocalStorageIfEmpty();
  }


  private initLocalStorageIfEmpty() {
    const data = localStorage.getItem(this.localStorageKey);
    if (!data)
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
  }
  private getLocalServices(): Service[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }
  private setLocalServices(services: Service[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(services));
  }

  private async createSQLiteConnection(): Promise<void> {
    if (!this.db) {
      this.db =
        await this.sqlite!.createConnection('data.db', false, 'no-encryption', 1, false);
      await this.db.open();
      await this.db.execute("CREATE TABLE IF NOT EXISTS SERVICES(id TEXT PRIMARY KEY, type TEXT,  image TEXT, title TEXT, price INTEGER, duration INTEGER, favorite TEXT)")
    }
  }

  async syncFirebaseToSQLite(): Promise<void> {
    if (this.platform === 'native') {
      const serviceRef = collection(this.firestore, 'services');
      const servicesSnapshot = await collectionData(serviceRef, { idField: 'id' }).toPromise();

      await this.createSQLiteConnection();

      // Insertar servicios en la base de datos SQLite
      for (let service of servicesSnapshot!) {
        await this.db!.run(
          'INSERT OR REPLACE INTO SERVICES (id, type, image, title, price, duration, favorite) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [service['id'], service['type'], service['image'], service['title'], service['price'], service['duration'], service['favorite'] ? 'true' : 'false']
        );
      }
    }
  }

  async getAllServices(): Promise<Service[]> {
    if (this.platform === 'web') {
      return this.getLocalServices();
    }
    await this.createSQLiteConnection();
    const result = await this.db!.query('SELECT * FROM SERVICES');
    return result.values?.map(services => ({
      ...services,
    })) || [];
  }

  async addService(type: string, image: string, title: string, price: number, duration: number, favorite: boolean): Promise<Service[]> {
    if (this.platform === 'web') {
      const service = this.getLocalServices();
      const newService: Service =
        { id: Date.now().toString(), type: type, image: image, title: title, price_euro: price, duration_minutes: duration, isFavorite: false };
      service.push(newService);
      this.setLocalServices(service);
      return service;
    }
    await this.createSQLiteConnection();
    await this.db!.run(
      'INSERT INTO SERVICES (type, image, title, price, duration, favorite) VALUES (?, ?, ?, ?, ?, ?)', [type, image, title, price, duration, favorite]);
    return this.getAllServices();
  }

  async deleteService(id: string): Promise<Service[]> {
    if (this.platform === 'web') {
      const todos = this.getLocalServices().filter(todo => todo.id !== id);
      this.setLocalServices(todos);
      return todos;
    }
    await this.createSQLiteConnection();
    await this.db!.run('DELETE FROM SERVICES WHERE id = ?', [id]);
    return this.getAllServices();
  }




}
