import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {IonButton, IonContent, IonHeader, IonList, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {Service} from "../../models/service.model";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {ServiceItemComponent} from "../../components/service/service-item/service-item.component";
import {Subscription} from "rxjs";
import {AppServicesService} from "../../services/app-services.service";
import {addIcons} from "ionicons";
import {star} from "ionicons/icons";

addIcons({
  star,
});

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, NgForOf, IonList, ServiceItemComponent, RouterModule, NgIf],
  standalone: true
})
export class HomePage implements OnInit, OnDestroy {
  primary_services: Service[] = [];
  secondary_services: Service[] = [];
  userEmail: string | null = null;

  private servicesSubscription?: Subscription;
  private router = inject(Router);
  private servicesService = inject(AppServicesService);

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('user_email');
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

