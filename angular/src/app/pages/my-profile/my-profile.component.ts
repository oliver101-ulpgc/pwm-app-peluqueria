import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonPageComponent } from '../../components/common_page/common_page';
import { AuthStateService } from '../../services/auth-state.service';
import { Observable, firstValueFrom } from 'rxjs';
import { updateProfile, User } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import {AuthService, UserProfile} from '../../services/auth.service';
import {doc, Firestore, setDoc} from '@angular/fire/firestore'; // 🟡 IMPORTANTE

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, CommonPageComponent, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);
  protected currentUser$: Observable<User | null> = this.authState.authState$;
  private firestore = inject(Firestore);
  userProfile: UserProfile |null = null;
  user: User | null = null;


  photoUrl: string = '';

  async ngOnInit() {
    this.user = await firstValueFrom(this.currentUser$);
    if (this.user) {
      this.userProfile = await this.authService.getUserProfile(this.user.uid);
    }
  }

  async updatePhoto() {
    if (this.userProfile) {
      const userDocRef = doc(this.firestore, `clients/${this.user?.uid}`);
      await setDoc(userDocRef, { photoURL: this.photoUrl }, { merge: true });

      // Opcional: recargar auth user y local userProfile
      await this.user?.reload();
      if (this.userProfile) {
        this.userProfile.photoURL = this.photoUrl;
      }
    }
  }
}
