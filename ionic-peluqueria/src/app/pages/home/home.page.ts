import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {IonContent, IonHeader, IonList, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {Service} from "../../models/service.model";
import {HomeService} from "../../services/home.service";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {ServiceItemComponent} from "../../components/service/service-item/service-item.component";
import {Subscription} from "rxjs";
import {AppServicesService} from "../../services/app-services.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, NgForOf, IonList, ServiceItemComponent],
  standalone: true
})
export class HomePage implements OnInit, OnDestroy {
  primary_services: Service[] = [];
  secondary_services: Service[] = [];

  private servicesSubscription?: Subscription;
  private router = inject(Router);
  private servicesService = inject(AppServicesService);

  ngOnInit(): void {
    this.servicesSubscription = this.servicesService.getServices().subscribe({
      next: (services: Service[]) => {
        this.primary_services = services.filter(s => s.type === 'service');
        this.secondary_services = services.filter(s => s.type === 'other_service');
      },
    });
  }

  ngOnDestroy(): void {
    this.servicesSubscription?.unsubscribe();
  }

  goToDetails(service: Service) {
    this.router.navigate(['/service-details'], {state: {service}}).then();
  }
}
