import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'graph-row',
    templateUrl: './graph-row.component.html',
    styleUrls: ['./graph-row.component.css'],
    imports: [CommonModule],
    standalone: true
})
export class GraphRowComponent {
  @Input() bar: any;
  @Input() totalReviews: number = 254;
}
