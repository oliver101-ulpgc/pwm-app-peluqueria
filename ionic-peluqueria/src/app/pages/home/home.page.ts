import {Component, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import {Service} from "../../models/interfaces.model";
import {HomeService} from "../../services/home.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  standalone: true
})
export class HomePage implements OnInit {
  primary_services: Service[] = [];
  secondary_services: Service[] = [];

  constructor(private homeService: HomeService) {}
  ngOnInit(): void {

    this.homeService.getServices().subscribe({
      next: (services: Service[]) => {
        this.primary_services = services.filter(s => s.type === 'service');
        this.secondary_services = services.filter(s => s.type === 'other_service');
      },
    });
  }
}
