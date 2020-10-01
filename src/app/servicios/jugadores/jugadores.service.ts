import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  private jugadoresColeccion: AngularFirestoreCollection;
  private jugadores: Observable<any>;
  private juegadoresDoc: AngularFirestoreDocument;

  constructor(private db: AngularFirestore) { 
    this.jugadoresColeccion = this.db.collection('usuarios');
    this.jugadores = this.jugadoresColeccion.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    }))
  }

  get getJugadores(): Observable<any> {
    return this.jugadores;
  }


}
