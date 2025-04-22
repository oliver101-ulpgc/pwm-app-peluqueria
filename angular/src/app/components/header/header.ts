import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuService} from '../menu/menu.service';
import {MenuComponent} from '../menu/menu';
import {AuthStateService} from '../../services/auth-state.service';
import {RouterLink} from '@angular/router';
import {firstValueFrom, Observable} from 'rxjs';
import {User} from '@angular/fire/auth';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'header-component',
    styleUrls: ['header.css', '../common_page/common.css'],
    templateUrl: './header.html',
    standalone: true,
  imports: [CommonModule, MenuComponent, RouterLink]
})

export class HeaderComponent implements OnInit{

  private authService = inject(AuthService);
  private authStateService = inject(AuthStateService);
  private menuService = inject(MenuService);
  authState$ = this.authStateService.authState$;
  protected currentUser$: Observable<User | null> = this.authState$;

  photoUrl: string = '';

  async ngOnInit() {
    const user = await firstValueFrom(this.currentUser$);
    if (user == null){
      return;
    }

    const userProfile = await this.authService.getUserProfile(user.uid);
    if(userProfile){
      this.photoUrl = userProfile.photoURL;
    }
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }
}
