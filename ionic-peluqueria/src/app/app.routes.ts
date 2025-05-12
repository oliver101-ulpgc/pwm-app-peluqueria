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
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites.page').then((m) => m.FavoritesPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'service-details',
    loadComponent: () => import('./pages/service-details/service-details.page').then( m => m.ServiceDetailsPage)
  }

];
