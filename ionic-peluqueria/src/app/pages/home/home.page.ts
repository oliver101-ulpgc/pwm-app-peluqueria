import {Component, OnInit} from '@angular/core';
import {IonContent, IonHeader, IonList, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {Service} from "../../models/service.model";
import {HomeService} from "../../services/home.service";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {ServiceItemComponent} from "../../components/service/service-item/service-item.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, NgForOf, IonList, ServiceItemComponent],
  standalone: true
})
export class HomePage implements OnInit {
  primary_services: Service[] = [];
  secondary_services: Service[] = [];

  constructor(private homeService: HomeService, private router: Router) {}

  ngOnInit(): void {

    this.homeService.getServices().subscribe({
      next: (services: Service[]) => {
        this.primary_services = services.filter(s => s.type === 'service');
        this.secondary_services = services.filter(s => s.type === 'other_service');
      },
    });
  }

  goToDetails(service: Service) {
    this.router.navigate(['/service-details'], {state: {service}}).then();
  }
}
