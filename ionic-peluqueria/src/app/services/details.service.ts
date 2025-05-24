import {Injectable, OnInit} from '@angular/core';
import {Service} from '../models/interfaces.model';
import {DbService} from "./db.service";

@Injectable({
  providedIn: 'root'
})

export class DetailsService {
  constructor(private dbService: DbService) {}

  async updateFavorite(id: string, isFavorite: boolean) {
    await this.dbService.updateFavoriteStatus(id, isFavorite);
  }

  async getServices(): Promise<Service[]> {
    return await this.dbService.getAllServices();
  }
}
