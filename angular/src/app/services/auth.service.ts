import { inject, Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from '@angular/fire/auth';

export interface UserSignUp {
  username: string;
  email: string;
  password: string;
  telephone: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  async signUp(user: UserSignUp) {

    const credential = await createUserWithEmailAndPassword(this.auth, user.email, user.password);

    if (credential.user) {
      await updateProfile(credential.user, {
        displayName: user.username
      });
    }

    return credential;
  }

  signIn(user: UserSignIn) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }
}
