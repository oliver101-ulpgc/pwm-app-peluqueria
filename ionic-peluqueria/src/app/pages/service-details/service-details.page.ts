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
import { Router } from '@angular/router';
import { Service } from "../../models/interfaces.model";
import {DbService} from "../../services/db.service";
import { addIcons } from 'ionicons';
import { star } from 'ionicons/icons';

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

  constructor(private router: Router, private dbService: DbService) {
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.service = nav?.extras.state?.['service'];

    if (!this.service) {
      // redirigir si se accede sin datos
      this.router.navigate(['/home']);
    }
  }

  async toggleFavorite() {
    this.service.isFavorite = !this.service.isFavorite;

    if (this.dbService.platform === 'web') {
      const allServices = this.dbService.getLocalServices();
      const updated = allServices.map(s =>
        s.id === this.service.id ? this.service : s
      );
      this.dbService.setLocalServices(updated);
    } else {
      await this.dbService.createSQLiteConnection();
      await this.dbService.db!.run(
        'UPDATE SERVICES SET favorite = ? WHERE id = ?',
        [this.service.isFavorite ? 'true' : 'false', this.service.id]
      );
    }
    console.log(this.service.isFavorite);
  }
}
