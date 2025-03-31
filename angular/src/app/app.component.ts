import { Component } from '@angular/core';
import { CommonPageComponent } from '../assets/common_component/common_page/common_page';

@Component({
  selector: 'app-root',
  template: `<common_page-component></common_page-component>`,
  standalone: true,
  imports: [CommonPageComponent]
})
export class AppComponent {}
