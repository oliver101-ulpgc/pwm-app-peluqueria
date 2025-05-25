import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Router} from '@angular/router';
import {Service} from "../../models/service.model";
import {DetailsService} from "../../services/details.service";
import {addIcons} from 'ionicons';
import {star} from 'ionicons/icons';

addIcons({
  star,
});

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, IonButton, IonIcon, IonItem, IonLabel]
})
export class ServiceDetailsPage implements OnInit {
  service!: Service;

  constructor(private router: Router, private detailsService: DetailsService) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.service = nav?.extras.state?.['service'];

    if (!this.service) {
      this.router.navigate(['/home']).then();
    }
  }

  async toggleFavorite() {
    this.service.isFavorite = !this.service.isFavorite;
    await this.detailsService.updateFavorite(this.service.id, this.service.isFavorite);
  }
}
