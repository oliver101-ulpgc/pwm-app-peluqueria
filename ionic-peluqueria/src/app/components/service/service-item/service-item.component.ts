import {Component, Input} from '@angular/core';
import {IonButton, IonIcon, IonItem, IonLabel, IonThumbnail} from "@ionic/angular/standalone";
import {Service} from "../../../models/service.model";

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
  imports: [
    IonIcon,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonButton
  ]
})
export class ServiceItemComponent {
  @Input() service!: Service;

  constructor() {}

  onStarClick(event: MouseEvent) {
    event.stopPropagation();
    console.log('Clicking in star button!');
  }
}
