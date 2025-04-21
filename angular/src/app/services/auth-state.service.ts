import {inject, Injectable} from '@angular/core';
import {Auth, authState, getAuth, signOut} from '@angular/fire/auth';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private auth = inject(Auth);
  private currentUser = this.auth.currentUser

  get authState$(): Observable<any> {
    return authState(this.auth);
  }

  logOut() {
    return signOut(this.auth);
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
