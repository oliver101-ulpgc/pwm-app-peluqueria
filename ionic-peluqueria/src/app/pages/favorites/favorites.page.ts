import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonAvatar,
  IonTitle,
  IonToolbar, IonBackButton
} from '@ionic/angular/standalone';
import {Service} from "../../models/service.model";
import { RouterModule } from '@angular/router';
import {NgForOf} from "@angular/common";
import {AppServicesService} from "../../services/app-services.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, NgForOf, IonList, IonAvatar, IonItem, IonThumbnail, IonLabel, RouterModule, IonBackButton],
  standalone: true
})
export class FavoritesPage implements OnInit, OnDestroy {
  services: Service[] = [];
  private servicesSubscription?: Subscription;

  constructor(private appServices: AppServicesService) {}

  ngOnInit(): void {
    this.servicesSubscription = this.appServices.getServices().subscribe(
      services => this.services = services.filter(s => s.isFavorite)
    );
  }

  ngOnDestroy(): void {
    this.servicesSubscription?.unsubscribe();
  }
}
