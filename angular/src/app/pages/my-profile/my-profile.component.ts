import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonPageComponent} from '../../components/common_page/common_page';

@Component({
  selector: 'app-my-profile',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

}
