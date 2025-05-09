import { inject, Injectable } from '@angular/core';
import {
  Auth, authState,
  createUserWithEmailAndPassword, deleteUser,
  signInWithEmailAndPassword, signOut,
  updateProfile,
  User
} from '@angular/fire/auth';
import {Firestore, doc, setDoc, getDoc, deleteDoc} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

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

export interface UserProfile {
  username: string;
  email: string;
  password: string;
  telephone: string;
  photoURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async signUp(user: UserSignUp) {
    const credential = await createUserWithEmailAndPassword(this.auth, user.email, user.password);

    if (credential.user) {
      await updateProfile(credential.user, {
        displayName: user.username
      });

      // Creamos el perfil del usuario
      const userProfile: UserProfile = {
        username: user.username,
        email: user.email,
        password: user.password,
        telephone: user.telephone,
        photoURL: 'https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-s%C3%ADmbolo-de-retrato.jpg?s=612x612&w=0&k=20&c=mY3gnj2lU7khgLhV6dQBNqomEGj3ayWH-xtpYuCXrzk='
      };

      const userDocRef = doc(this.firestore, `clients/${credential.user.uid}`);
      await setDoc(userDocRef, userProfile);
    }

    return credential;
  }

  async logIn(user: UserSignIn) {
    return await signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(this.firestore, `clients/${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      return null;
    }
  }

  get authState$(): Observable<User | null> {
    return authState(this.auth);
  }

  async deleteAccount(user: User) {
    try {
      const userDocRef = doc(this.firestore, `clients/${user.uid}`);
      await deleteDoc(userDocRef);

      await deleteUser(user);

    } catch (error) {
      throw error;
    }
  }

  logOut() {
    return signOut(this.auth);
  }
}
