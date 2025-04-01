import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'header-component',
    styleUrls: ['header.css', '../../common_style/common.css'],
    templateUrl: './header.html',
    standalone: true,
    imports: [CommonModule]
})

export class HeaderComponent {}
