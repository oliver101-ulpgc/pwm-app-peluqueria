import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MenuService} from '../../services/menu.service';
import {AuthService} from '../../services/auth.service';
import {firstValueFrom, Observable} from 'rxjs';
import {User} from '@angular/fire/auth';

@Component({
    selector: 'menu-component',
    styleUrl: 'menu.css',
    templateUrl: './menu.html',
    standalone: true,
  imports: [CommonModule, RouterLink]
})

export class MenuComponent implements OnInit {
  isOpen = false;
  private authService = inject(AuthService);
  authState$ = this.authService.authState$;
  protected currentUser$: Observable<User | null> = this.authState$;
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;

  photoUrl: string = '';

  constructor(
    private menuService: MenuService,
    private router: Router
  ) {}

  async ngOnInit() {
    const user = await firstValueFrom(this.currentUser$);
    if (user == null){
      return;
    }

    const userProfile = await this.authService.getUserProfile(user.uid);
    if(userProfile){
      this.photoUrl = userProfile.photoURL;
    }

    this.menuService.isMenuOpen$.subscribe(state => {
      this.isOpen = state;
    });
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

  closeMenu() {
    this.menuService.closeMenu();
  }

  logout() {
    this.authService.logOut().then(r => {});
    this.router.navigate(['']).then(r => {});
    this.closeMenu();
  }
}
