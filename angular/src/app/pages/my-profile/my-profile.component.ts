import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonPageComponent } from '../../components/common_page/common_page';
import { AuthStateService } from '../../services/auth-state.service';
import { Observable, firstValueFrom } from 'rxjs';
import { updateProfile, User } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms'; // 🟡 IMPORTANTE

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, CommonPageComponent, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  private authState = inject(AuthStateService);
  protected currentUser$: Observable<User | null> = this.authState.authState$;

  photoUrl: string = '';

  async updatePhoto() {
    const user = await firstValueFrom(this.currentUser$);
    if (user && this.photoUrl.trim() !== '') {
      await updateProfile(user, {
        photoURL: this.photoUrl
      });
      await user.reload();
    }
  }
}
