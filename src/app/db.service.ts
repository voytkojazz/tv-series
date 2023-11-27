import { Injectable } from '@angular/core';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  app: FirebaseApp
  private readonly _db: Firestore

  constructor() {
    this.app = initializeApp(firebaseConfig)
    this._db = getFirestore(this.app)
  }

  get db(): Firestore {
    return this._db
  }
}
