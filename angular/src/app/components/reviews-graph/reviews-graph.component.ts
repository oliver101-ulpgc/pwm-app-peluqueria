import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphRowComponent} from '../graph-row/graph-row.component';

@Component({
    selector: 'reviews-graph',
    templateUrl: './reviews-graph.component.html',
    styleUrls: ['./reviews-graph.component.css'],
    standalone: true,
    imports: [CommonModule, GraphRowComponent]
})
export class ReviewsGraphComponent {
  @Input() data: any = { meta: {}, bars: [] };
}
