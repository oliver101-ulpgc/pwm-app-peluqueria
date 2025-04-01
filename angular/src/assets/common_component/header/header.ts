import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuService} from '../menu/menu.service';
import {MenuComponent} from '../menu/menu';

@Component({
    selector: 'header-component',
    styleUrls: ['header.css', '../../common_style/common.css'],
    templateUrl: './header.html',
    standalone: true,
    imports: [CommonModule, MenuComponent]
})

export class HeaderComponent {
  constructor(
    private menuService: MenuService
  ) {}

  toggleMenu() {
    this.menuService.toggleMenu();
  }
}
