import {Component, OnInit} from '@angular/core';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {CommonModule} from '@angular/common';
import {Hairdresser} from '../../models/interfaces.model';
import {HairdressersService} from '../../services/hairdressers.service';

@Component({
  selector: 'details-component',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  hairdressers: Hairdresser[] = [];

  constructor(private hairdressersService: HairdressersService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.hairdressers = await this.hairdressersService.getHairdressers();
    } catch (error) {
      console.error('Error fetching hairdressers:', error);
    }
  }
}
