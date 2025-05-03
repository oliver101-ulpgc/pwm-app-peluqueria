import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'nav-component',
    styleUrls: ['nav.css'],
    templateUrl: './nav.html',
    standalone: true,
  imports: [CommonModule, RouterLink]
})

export class NavComponent {
  toggleNav() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
      navLinks.classList.toggle('active'); // Toggle the 'active' class to show or hide the links
    }
  }
}
