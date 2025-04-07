import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {Portfolio, Service} from '../../models/interfaces.model'
import {PortfolioService} from '../../services/portfolioService/portfolio.Service';
import {Subscription} from 'rxjs';
import {PortfolioCardComponent} from '../../components/portfolio-card/portfolio-card.component';

@Component({
  selector: 'portfolio-component',
  imports: [CommonModule, CommonPageComponent, PortfolioCardComponent],
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})

export class PortfolioComponent implements OnInit, OnDestroy {

  portfolios_main: Portfolio[] = [];
  portfolios_secondary: Portfolio[] = [];
  private sub: Subscription = new Subscription();

  constructor(private portfolioService: PortfolioService) {
  }

  ngOnInit(): void {
    this.sub = this.portfolioService.getImages().subscribe({
      next: (portfolio: Portfolio[]) => {
        this.portfolios_main = portfolio.filter(p => p.type === 'hombre');
        this.portfolios_secondary = portfolio.filter(p => p.type === 'mujer');
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
