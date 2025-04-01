import {Component, Inject} from '@angular/core';
import { CommonPageComponent } from '../assets/common_component/common_page/common_page';
import {RouterModule} from '@angular/router';
import {ThemeService} from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonPageComponent, RouterModule]
})
export class AppComponent {

  constructor(private themeService: ThemeService) {}

  title: string = 'angular';

  ngOnInit(): void {
    this.themeService.setTheme();
  }
}
