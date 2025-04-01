import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from '../../assets/common_component/footer/footer';
import {MenuComponent} from '../../assets/common_component/menu/menu';
import {NavComponent} from '../../assets/common_component/nav/nav';
import {HeaderComponent} from '../../assets/common_component/header/header';
import {Item} from '../item.model'

@Component({
  selector: 'home-component',
  imports: [CommonModule, FooterComponent, MenuComponent, NavComponent, HeaderComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.css', '../../assets/common_style/common.css']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];

  async fetchItems() {
    try {
      const response = await fetch('/assets/data/data.json');
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      this.items = await response.json();
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  }

  ngOnInit() {
    this.fetchItems();
  }
}
