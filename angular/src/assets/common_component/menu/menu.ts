import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'menu-component',
    styleUrl: '../../common_style/common.css',
    templateUrl: './menu.html',
    standalone: true,
    imports: [CommonModule]
})

export class MenuComponent {
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;

  constructor(private router: Router) {}

  toggleMenu() {
    const menu = this.menuContainer.nativeElement;
    const overlay = this.overlay.nativeElement;

    menu.classList.toggle('active');
    overlay.classList.toggle('active', menu.classList.contains('active'));
  }

  logout() {
    localStorage.setItem("isLogged", "false");
    this.router.navigate(['']);
  }
}
