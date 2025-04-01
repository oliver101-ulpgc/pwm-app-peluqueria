import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'header-component',
    styleUrl: 'header.css',
    templateUrl: './header.html',
    standalone: true,
    imports: [CommonModule]
})

export class HeaderComponent {}
