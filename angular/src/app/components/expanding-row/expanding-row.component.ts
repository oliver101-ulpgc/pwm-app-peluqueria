import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'expanding-row',
  imports: [
    NgIf
  ],
  templateUrl: './expanding-row.component.html',
  styleUrl: './expanding-row.component.css'
})
export class ExpandingRowComponent {
  showContent: boolean = false;
  @Input() buttonText: string = '';

  toggle() {
    this.showContent = !this.showContent;
  }
}
