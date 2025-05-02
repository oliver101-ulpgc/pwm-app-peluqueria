import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {CommonModule} from '@angular/common';
import {Details, Hairdresser} from '../../models/interfaces.model';
import {HairdressersService} from '../../services/hairdressers.service';
import {Subscription} from 'rxjs';
import {DetailsService} from '../../services/details.service';

@Component({
  selector: 'details-component',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, OnDestroy {
  hairdressers: Hairdresser[] = [];

  private hairdressersSubscription?: Subscription;
  details: Details | null = null;

  constructor(private hairdressersService: HairdressersService, private detailsService: DetailsService) {}

  ngOnInit(): void {
    this.hairdressersSubscription = this.hairdressersService.getHairdressers().subscribe(
      (hairdressers) => {
        this.hairdressers = hairdressers;
      });
    this.detailsService.getDetails().subscribe((detailsArray) => {
      if (detailsArray.length > 0) {
        this.details = detailsArray[0];
      }
    });
  }

  ngOnDestroy(): void {
    this.hairdressersSubscription?.unsubscribe();
  }
}
