import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {CommonModule} from '@angular/common';
import {Hairdresser} from '../../models/interfaces.model';
import {HairdressersService} from '../../services/hairdressers.service';
import {Subscription} from 'rxjs';

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

  constructor(private hairdressersService: HairdressersService) {}

  ngOnInit(): void {
    this.hairdressersSubscription = this.hairdressersService.getHairdressers().subscribe(
      (hairdressers) => {
        this.hairdressers = hairdressers;
      }
    );
  }

  ngOnDestroy(): void {
    this.hairdressersSubscription?.unsubscribe();
  }
}
