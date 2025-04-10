import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from "../footer/footer";
import {MenuComponent} from "../menu/menu";
import {NavComponent} from "../nav/nav";
import {HeaderComponent} from "../header/header";

@Component({
    selector: 'common_page-component',
    templateUrl: './common_page.html',
    standalone: true,
    styleUrls: ['../../../assets/common_style/common.css'],
    imports: [CommonModule, FooterComponent, MenuComponent, NavComponent, HeaderComponent]
})

export class CommonPageComponent {}
