import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'menu-component',
    styleUrl: '../../common_style/common.css',
    templateUrl: './menu.html',
    standalone: true,
    imports: [CommonModule]
})

export class MenuComponent {}