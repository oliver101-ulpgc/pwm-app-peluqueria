import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {map} from 'rxjs';
import {AuthService} from '../services/auth.service';

export const privateGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.authState$.pipe(
    map(auth => {
      if (!auth) {
        router.navigate(['log-in']).then(r => {});
        return false;
      }
      return true;
    })
  );
};

export const publicGuard: CanActivateFn = () => {
  const router = inject(Router);
  const state = inject(AuthService);

  return state.authState$.pipe(
    map(auth => {
      if (auth) {
        router.navigate(['']).then(r => {});
        return false;
      }
      return true;
    })
  );
};

