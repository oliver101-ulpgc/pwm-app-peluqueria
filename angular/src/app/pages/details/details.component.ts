import {Component, OnInit} from '@angular/core';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {CommonModule} from '@angular/common';
import {Hairdresser} from '../../models/interfaces.model';

@Component({
  selector: 'details-component',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  hairdressers: Hairdresser[] = [];

  async FetchHairdressers(): Promise<void> {
    try{
      const response = await fetch('/assets/data/hairdressers.json');
      if(!response.ok){
        throw new Error(response.statusText);
      }
      const data = await response.json();
      this.hairdressers = data.data;
    }
    catch(error){
      console.error(error);
    }
  }

  ngOnInit() {
    this.FetchHairdressers()
  }
}
