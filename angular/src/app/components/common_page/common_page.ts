import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "../footer/footer";
import {MenuComponent} from "../menu/menu";
import {NavComponent} from "../nav/nav";
import {HeaderComponent} from "../header/header";
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'common_page-component',
    templateUrl: './common_page.html',
    standalone: true,
    styleUrls: ['./common.css'],
  imports: [CommonModule, FooterComponent, MenuComponent, NavComponent, HeaderComponent, RouterOutlet]
})

export class CommonPageComponent {}
