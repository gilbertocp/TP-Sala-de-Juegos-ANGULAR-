import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  private partidasColeccion: AngularFirestoreCollection;
  private partidas: Observable<any>;
  private partidasDoc: AngularFirestoreDocument;
  private jugador$: Observable<any>;
  private apodoJugador: string;

  constructor(private db: AngularFirestore, private afs: AngularFirestore, public afAuth: AngularFireAuth) { 
    this.partidasColeccion = this.db.collection('partidas');
    this.partidas = this.partidasColeccion.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    }));

    this.jugador$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc(`usuarios/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );

    this.jugador$.subscribe((usuario:any) => this.apodoJugador = usuario.apodo , console.error);

  }

  get getPartidas() {
    return this.partidas;
  }

  private agregarPartida(juego: any): void {
    juego = {jugador: juego.jugador, nombreJuego: juego.nombre, resultado: juego.gano, fecha: firestore.Timestamp.fromDate(new Date())}
    this.partidasColeccion.add(juego);
  }

  juegoTerminado(juego: any): void {
    juego.jugador = this.apodoJugador;
    this.agregarPartida(juego);
  }
}
