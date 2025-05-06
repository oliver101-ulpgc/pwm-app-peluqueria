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
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'log-in',
    loadComponent: () => import('./pages/log-in/log-in.page').then( m => m.LogInPage)
  },

];
