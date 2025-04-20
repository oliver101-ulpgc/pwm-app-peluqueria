import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {MenuService} from './menu.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'menu-component',
    styleUrl: 'menu.css',
    templateUrl: './menu.html',
    standalone: true,
    imports: [CommonModule]
})

export class MenuComponent {
  isOpen = false;
  private authService = inject(AuthService);
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
    this.authService
    this.router.navigate(['']);
  }
}
