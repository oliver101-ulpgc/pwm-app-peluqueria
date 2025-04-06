import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/homeService/homeService';
import { CommonPageComponent } from '../../components/common_page/common_page';
import { Services } from '../../models/interfaces.model';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, CommonPageComponent],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  primary_services: Services[] = [];
  secondary_services: Services[] = [];
  private sub: Subscription = new Subscription();

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.sub = this.homeService.getServices().subscribe({
      next: (services: Services[]) => {
        console.log("Hola", services);
        if (!Array.isArray(services)) {
          console.warn('La respuesta no es un array:', services);
          return;
        }

        // Filtra los servicios por tipo
        this.primary_services = services.filter(s => s.type === 'service');
        this.secondary_services = services.filter(s => s.type === 'other_service');
      },
      error: (err) => {
        console.error('Error:', err);
        this.primary_services = [];
        this.secondary_services = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
