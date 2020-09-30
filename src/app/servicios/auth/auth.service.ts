import { Injectable } from '@angular/core';
import { first, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { User } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc(`usuarios/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  async logout(): Promise<void> {
    return await this.afAuth.signOut();
  }

  async getCurrentUser(): Promise<firebase.User> {
    return await this.afAuth.authState.pipe(first()).toPromise();
  }

  isLogged(): boolean {
    if (localStorage.getItem('key_saladejuegos')) {
      return true;
    }

    return false;
  }
}
