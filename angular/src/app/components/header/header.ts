import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuService} from '../menu/menu.service';
import {MenuComponent} from '../menu/menu';
import {AuthStateService} from '../../services/auth-state.service';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'header-component',
    styleUrls: ['header.css', '../../../assets/common_style/common.css'],
    templateUrl: './header.html',
    standalone: true,
  imports: [CommonModule, MenuComponent, RouterLink]
})

export class HeaderComponent {

  private authStateService = inject(AuthStateService);
  private menuService = inject(MenuService);
  authState$ = this.authStateService.authState$;


  toggleMenu() {
    this.menuService.toggleMenu();
  }
}
