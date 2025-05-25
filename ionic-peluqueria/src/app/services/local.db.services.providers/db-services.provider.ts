import {Service} from "../../models/service.model";

export interface DbServicesProvider {
  initDb(): void
  getAllServices(): Promise<Service[]>,
  setServices(services: Service[]): void,
}
