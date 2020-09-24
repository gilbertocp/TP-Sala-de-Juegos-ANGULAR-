import { Juego } from './juego';

export class JuegoElAhorcado extends Juego {

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super('El Ahorcado', gano, jugador);
  }

  verificar(): boolean {
    return true;
  }

}