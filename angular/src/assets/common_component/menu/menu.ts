import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {MenuService} from './menu.service';

@Component({
    selector: 'menu-component',
    styleUrl: 'menu.css',
    templateUrl: './menu.html',
    standalone: true,
    imports: [CommonModule]
})

export class MenuComponent {
  isOpen = false;
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;

  constructor(
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuService.isMenuOpen$.subscribe(state => {
      this.isOpen = state;
    });
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

  logout() {
    localStorage.setItem("isLogged", "false");
    this.router.navigate(['']);
  }
}
