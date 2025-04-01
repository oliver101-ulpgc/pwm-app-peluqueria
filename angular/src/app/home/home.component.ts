import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Item} from '../item.model'
import {CommonPageComponent} from '../../assets/common_component/common_page/common_page';

@Component({
  selector: 'home-component',
  imports: [CommonModule, CommonPageComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.css', '../../assets/common_style/common.css']
})
export class HomeComponent implements OnInit {
  items_primary: Item[] = [];
  items_secondary: Item[] = [];

  async fetchItems() {
    try {
      const response = await fetch('/assets/data/data.json');
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      const data = await response.json();
      data.data.forEach((item: Item) => {
        if (item.type == "service"){
          this.items_primary.push(item)
        }
        else {
          this.items_secondary.push(item)
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
