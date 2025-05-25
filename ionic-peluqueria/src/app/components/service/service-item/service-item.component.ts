import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IonButton, IonIcon, IonItem, IonLabel, IonThumbnail} from "@ionic/angular/standalone";
import {Service} from "../../../models/service.model";
import {AppServicesService} from "../../../services/app-services.service";
import {AuthService} from "../../../services/auth.service";
import {Subscription} from "rxjs";
import {User} from "@angular/fire/auth";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
  imports: [
    IonIcon,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonButton,
    NgIf
  ]
})
export class ServiceItemComponent implements OnInit, OnDestroy{
  @Input() service!: Service;
  private authSubscription?: Subscription;
  protected authState: User | null = null;

  constructor(private appServices: AppServicesService, private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authState$.subscribe(
      authState => this.authState = authState
    );
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  onStarClick(event: MouseEvent) {
    event.stopPropagation();
    this.appServices.updateServiceIsFavorite(this.service.id, !this.service.isFavorite);
  }
}
