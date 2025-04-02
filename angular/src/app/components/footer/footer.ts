import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'footer-component',
    styleUrls: ['footer.css', '../../../assets/common_style/common.css'],
    templateUrl: './footer.html',
    standalone: true,
    imports: [CommonModule]
})

export class FooterComponent {}
