import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Services} from '../interfaces.model'
import {CommonPageComponent} from '../../assets/common_component/common_page/common_page';

@Component({
  selector: 'home-component',
  imports: [CommonModule, CommonPageComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.css', '../../assets/common_style/common.css']
})
export class HomeComponent implements OnInit {
  services_primary: Services[] = [];
  services_secondary: Services[] = [];

  async fetchItems() {
    try {
      const response = await fetch('/assets/data/data.json');
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      const data = await response.json();
      data.data.forEach((item: Services) => {
        if (item.type == "service"){
          this.services_primary.push(item)
        }
        else {
          this.services_secondary.push(item)
        }
      })

    } catch (error) {
      console.error('Error en la petición:', error);
    }
  }

  ngOnInit() {
    this.fetchItems();
  }
}
