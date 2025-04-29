import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'footer-component',
  styleUrls: ['footer.css', '../common_page/common.css'],
  templateUrl: './footer.html',
  standalone: true,
  imports: [CommonModule, RouterLink]
})

export class FooterComponent {}
