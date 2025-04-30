import {Component, input, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphRowComponent} from '../graph-row/graph-row.component';
import {ReviewGraphData} from '../../models/interfaces.model';

@Component({
    selector: 'reviews-graph',
    templateUrl: './reviews-graph.component.html',
    styleUrls: ['./reviews-graph.component.css'],
    standalone: true,
    imports: [CommonModule, GraphRowComponent]
})
export class ReviewsGraphComponent {
  @Input() graphData!: ReviewGraphData;
}
