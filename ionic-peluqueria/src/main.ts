import {bootstrapApplication} from '@angular/platform-browser';
import {RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules} from '@angular/router';
import {IonicRouteStrategy, provideIonicAngular} from '@ionic/angular/standalone';

import {routes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {SQLiteConnection} from "@capacitor-community/sqlite";

bootstrapApplication(AppComponent, {
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({
      projectId: "pwm-peluqeria",
      appId: "1:932508723937:web:e4329f7586d913d233e5a0",
      storageBucket: "pwm-peluqeria.firebasestorage.app",
      apiKey: "AIzaSyCD2NV2JOPtFDCkveRZGjBWz2lVQM6IPX8",
      authDomain: "pwm-peluqeria.firebaseapp.com",
      messagingSenderId: "932508723937",
      measurementId: "G-7Z9L7VRQJ3"
    })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
});
