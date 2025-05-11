import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'log-in',
    loadComponent: () => import('./pages/log-in/log-in.page').then((m) => m.LogInPage),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up.page').then((m) => m.SignUpPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }

];
