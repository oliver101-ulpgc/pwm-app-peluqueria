import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Subscription} from 'rxjs';
import {HomeService} from '../../services/homeService/home.Service';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {Service} from '../../models/interfaces.model';
import {ServiceCardComponent} from '../../components/service-card/service-card.component';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, CommonPageComponent, ServiceCardComponent],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
