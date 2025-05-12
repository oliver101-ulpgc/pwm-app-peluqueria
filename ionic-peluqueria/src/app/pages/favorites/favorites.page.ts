import {Component, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader, IonCardTitle, IonList, IonItem, IonThumbnail, IonLabel
} from '@ionic/angular/standalone';
import {Service} from "../../models/interfaces.model";
import {HomeService} from "../../services/home.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, NgForOf, IonList, IonItem, IonThumbnail, IonLabel],
  standalone: true
})
export class FavoritesPage implements OnInit {
  services: Service[] = [];

  constructor(private homeService: HomeService) {}
  ngOnInit(): void {

    this.homeService.getServices().subscribe({
      next: (services: Service[]) => {
        this.services = services;
      },
    });
  }
}
