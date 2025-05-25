import {Component, OnInit} from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonAvatar,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Service} from "../../models/service.model";
import { RouterModule } from '@angular/router';
import {HomeService} from "../../services/home.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, NgForOf, IonList, IonAvatar, IonItem, IonThumbnail, IonLabel, RouterModule],
  standalone: true
})
export class FavoritesPage implements OnInit {
  services: Service[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {

    this.homeService.getServices().subscribe({
      next: (services: Service[]) => {
        this.services = services.filter(s => s.isFavorite);
      },
    });
  }
}
