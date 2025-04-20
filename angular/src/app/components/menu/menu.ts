import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {MenuService} from './menu.service';
import {AuthService} from '../../services/auth.service';
import {AuthStateService} from '../../services/auth-state.service';

@Component({
    selector: 'menu-component',
    styleUrl: 'menu.css',
    templateUrl: './menu.html',
    standalone: true,
    imports: [CommonModule]
})

export class MenuComponent {
  isOpen = false;
  private authStateService = inject(AuthStateService);
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
    this.authStateService.logOut();
    this.router.navigate(['/log-in']);
  }
}
