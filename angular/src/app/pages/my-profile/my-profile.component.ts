import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonPageComponent } from '../../components/common_page/common_page';
import { Observable, firstValueFrom } from 'rxjs';
import { updateProfile, User } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import {AuthService, UserProfile} from '../../services/auth.service';
import {doc, Firestore, setDoc} from '@angular/fire/firestore';
import {Router} from '@angular/router'; // 🟡 IMPORTANTE

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, CommonPageComponent, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  private authService = inject(AuthService);
  protected currentUser$: Observable<User | null> = this.authService.authState$;
  private firestore = inject(Firestore);
  userProfile: UserProfile |null = null;
  user: User | null = null;


  photoUrl: string = '';
  private router= inject(Router);

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

      await this.user?.reload();
      if (this.userProfile) {
        this.userProfile.photoURL = this.photoUrl;
      }
    }
  }

  async onDeleteAccount() {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.');

    if (!confirmDelete) {
      return;
    }

    const user = await firstValueFrom(this.authService.authState$);

    if (!user) {
      alert('No hay usuario autenticado.');
      return;
    }

    try {
      await this.authService.deleteAccount(user);
      alert('Tu cuenta ha sido eliminada con éxito.');
      this.router.navigateByUrl('/');  // Redirige a la página principal u otra página
    } catch (error) {
      alert('Hubo un error al eliminar la cuenta. Por favor, inténtalo de nuevo.');
    }
  }
}
