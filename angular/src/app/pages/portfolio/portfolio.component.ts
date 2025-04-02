import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {Portfolio} from '../../models/interfaces.model'

@Component({
  selector: 'portfolio-component',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})

export class PortfolioComponent implements OnInit {
portfolios_main: Portfolio[] = [];
portfolios_secondary: Portfolio[] = [];

async fetchItems() {
  try {
    const response = await fetch('/assets/data/portfolio.json')
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      const data = await response.json();
      data.data.forEach((item: Portfolio) => {
        if(item.type == 'hombre'){
          this.portfolios_main.push(item)
        }
        else {
          this.portfolios_secondary.push(item)
        }
      })
    }
    catch(err) {
     console.error("Error en la petición", err);
    }
  }

  ngOnInit() {
    this.fetchItems();
  }
}
