import {Injectable} from '@angular/core';
import {Service} from "../models/service.model";
import {Capacitor} from "@capacitor/core";
import {DbServicesProvider} from "./local.db.services.providers/db-services.provider";
import {SqliteDbServicesProvider} from "./local.db.services.providers/sqlite-db-services.provider";
import {LocalStorageDbServicesProvider} from "./local.db.services.providers/local-storage-db-services.provider";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private platform: 'native' | 'web' = Capacitor.getPlatform() === 'web' ? 'web' : 'native';
  private dbServiceProvider!: DbServicesProvider;

  constructor() {
    this.init();
  }

  private async init() {
    switch (this.platform) {
      case "native":
        this.dbServiceProvider = new SqliteDbServicesProvider();
        this.dbServiceProvider.initDb();
        break;
      case "web":
        this.dbServiceProvider = new LocalStorageDbServicesProvider();
        this.dbServiceProvider.initDb();
        break;
    }
  }

  public async saveLocally(services: Service[]) {
    this.dbServiceProvider.setServices(services);
  }

  public async getAllServices(): Promise<Service[]> {
    return await this.dbServiceProvider.getAllServices();
  }
}
