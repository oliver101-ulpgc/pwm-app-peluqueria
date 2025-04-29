import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(), provideFirebaseApp(() => initializeApp({
      projectId: "pwm-peluqeria",
      appId: "1:932508723937:web:e4329f7586d913d233e5a0",
      storageBucket: "pwm-peluqeria.firebasestorage.app",
      apiKey: "AIzaSyCD2NV2JOPtFDCkveRZGjBWz2lVQM6IPX8",
      authDomain: "pwm-peluqeria.firebaseapp.com",
      messagingSenderId: "932508723937",
      measurementId: "G-7Z9L7VRQJ3"
    })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
