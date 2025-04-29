import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonPageComponent} from '../../components/common_page/common_page';

@Component({
  selector: 'policies-component',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.css'
})

export class PoliciesComponent {

}
