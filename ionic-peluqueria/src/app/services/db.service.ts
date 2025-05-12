import {inject, Injectable} from '@angular/core';
import {SQLiteConnection, SQLiteDBConnection} from "@capacitor-community/sqlite";
import {Service} from "../models/interfaces.model";
import {HomeService} from "./home.service";

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private homeService  = inject(HomeService);
  private sqlite: SQLiteConnection | undefined;
  private db: SQLiteDBConnection | null = null;
  private platform?: 'native' | 'web';
  private localStorageKey = "todos";

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
      await this.db.execute("CREATE TABLE IF NOT EXIST SERVICES(id TEXT PRIMARY KEY AUTOINCREMENT, type TEXT,  image TEXT, title TEXT, price INTEGER, duration INTEGER, favorite TEXT)")
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



}
