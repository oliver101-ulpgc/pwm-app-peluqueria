import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonPageComponent} from '../../components/common_page/common_page';
import {AuthStateService} from '../../services/auth-state.service';

@Component({
  selector: 'app-my-profile',
  imports: [CommonModule, CommonPageComponent],
  standalone: true,
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  private authState = inject(AuthStateService);
  protected currentUser = this.authState.getCurrentUser();
}
