import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent implements OnInit {

  constructor(private themeService: ThemeService) {}

  //title: string = 'angular';

  ngOnInit(): void {
    this.themeService.setTheme();
  }
}
