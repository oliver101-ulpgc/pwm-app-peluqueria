import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'nav-component',
    styleUrls: ['nav.css', '../../../assets/common_style/light-theme.css'],
    templateUrl: './nav.html',
    standalone: true,
    imports: [CommonModule]
})

export class NavComponent {
  toggleNav() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
      navLinks.classList.toggle('active'); // Toggle the 'active' class to show or hide the links
    }
  }
}
