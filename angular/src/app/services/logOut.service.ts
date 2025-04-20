import {inject, Injectable} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {UserSignUp} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {

  private auth = inject(Auth);

  logOut(user: UserSignUp) {
    return;
  }
}
