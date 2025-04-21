import {inject, Injectable} from '@angular/core';
import {Auth, authState, signOut, User} from '@angular/fire/auth';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private auth = inject(Auth);

  get authState$(): Observable<User | null> {
    return authState(this.auth);
  }

  logOut() {
    return signOut(this.auth);
  }
}
