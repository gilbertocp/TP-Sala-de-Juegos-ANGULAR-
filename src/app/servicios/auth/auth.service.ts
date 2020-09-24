import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

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
