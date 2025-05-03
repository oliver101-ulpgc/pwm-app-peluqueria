import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Portfolio} from '../../models/interfaces.model'
import {PortfolioService} from '../../services/portfolio.service';
import {PortfolioCardComponent} from '../../components/portfolio-card/portfolio-card.component';

@Component({
  selector: 'portfolio-component',
  imports: [CommonModule, PortfolioCardComponent],
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})

export class PortfolioComponent implements OnInit {

  portfolios_main: Portfolio[] = [];
  portfolios_secondary: Portfolio[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getImages().subscribe({
      next: (portfolio: Portfolio[]) => {
        this.portfolios_main = portfolio.filter(p => p.type === 'hombre');
        this.portfolios_secondary = portfolio.filter(p => p.type === 'mujer');
      },
    });
  }
}
