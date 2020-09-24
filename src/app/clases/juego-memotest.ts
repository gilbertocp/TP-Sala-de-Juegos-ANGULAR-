import { Juego } from './juego';
export class JuegoMemotest extends Juego {
  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super('Memotest', gano, jugador);
  }
  verificar(): boolean {
    return true;
  }
}