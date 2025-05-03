import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThemeService} from './services/theme.service';
import {NgxSonnerToaster} from 'ngx-sonner';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [RouterModule, NgxSonnerToaster]
})
export class AppComponent implements OnInit {

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setTheme();
  }
}
