import {DbServicesProvider} from "./db-services.provider";
import {Service} from "../../models/service.model";

export class LocalStorageDbServicesProvider implements DbServicesProvider {
  private localStorageKey = "services";

  initDb(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (!data) localStorage.setItem(this.localStorageKey, JSON.stringify([]));
  }

  async getAllServices(): Promise<Service[]> {
    const data = localStorage.getItem(this.localStorageKey);
    return data
      ? (JSON.parse(data) as Service[])
      : [];
  }

  setServices(services: Service[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(services));
  }
}
