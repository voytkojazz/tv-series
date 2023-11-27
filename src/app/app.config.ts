import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { FirebaseConfig } from './types/types';
import { provideHttpClient, withFetch } from '@angular/common/http';


export const FIREBASE_CONFIG = new InjectionToken<FirebaseConfig>("app.config firebase")
export const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyCrdlzROmF7gf1zdgOnPYEx-QuKquB9xMc",
  authDomain: "tv-series-ce711.firebaseapp.com",
  projectId: "tv-series-ce711",
  storageBucket: "tv-series-ce711.appspot.com",
  messagingSenderId: "972121849173",
  appId: "1:972121849173:web:55b9c3493784de271643dc",
  measurementId: "G-62JJZKDHCF"
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
  ],
};


