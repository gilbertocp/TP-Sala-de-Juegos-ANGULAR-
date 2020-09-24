import { Juego } from './juego';

export class JuegoTateti extends Juego {

  COMBINACIONES_GANAR: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  NUMEROS_CELDAS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  seleccionUsuario: string;
  seleccionComputadora: string;

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super('Tateti', gano, jugador);
  }

  verificar(): boolean {
    return true;
  }
}
