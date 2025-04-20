import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthStateService} from '../services/auth-state.service';
import {map} from 'rxjs';

export const privateGuard: CanActivateFn = () => {
  const router = inject(Router);
  const state = inject(AuthStateService);

  return state.authState$.pipe(
    map(auth => {
      if (!auth) {
        router.navigate(['log-in']);
        return false;
      }
      return true;
    })
  );
};

export const publicGuard: CanActivateFn = () => {
  const router = inject(Router);
  const state = inject(AuthStateService);

  return state.authState$.pipe(
    map(auth => {
      if (auth) {
        router.navigate(['']);
        return false;
      }
      return true;
    })
  );
};

