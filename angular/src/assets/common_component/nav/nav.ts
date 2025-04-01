import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'nav-component',
    styleUrl: 'nav.css',
    templateUrl: './nav.html',
    standalone: true,
    imports: [CommonModule]
})

export class NavComponent {}
