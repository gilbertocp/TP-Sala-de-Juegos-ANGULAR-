import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {

  private partidasColeccion: AngularFirestoreCollection;
  private partidas: Observable<any>;
  private partidasDoc: AngularFirestoreDocument;

  constructor(private db: AngularFirestore) { 
    this.partidasColeccion = this.db.collection('partidas');
    this.partidas = this.partidasColeccion.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  get getPartidas() {
    return this.partidas;
  }

  agregarPartida(juego: any): void {
    juego = {jugador: juego.jugador, nombreJuego: juego.nombre, resultado: juego.gano, fecha: firestore.Timestamp.fromDate(new Date())}
    this.partidasColeccion.add(juego);
  }
}
