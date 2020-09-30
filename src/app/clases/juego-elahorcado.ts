import { Juego } from './juego';

export class JuegoElAhorcado extends Juego {

  palabraAdivinar: string;

  palabras = [
    'php',
    'java',
    'javascript',
    'angular',
    'ionic',
    'html',
    'css',
    'react',
    'vue',
    'ember',
    'python',
    'kotlin',
    'flutter',
  ];

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super('El Ahorcado', gano, jugador);
    this.palabraAdivinar = this.generarPalabraAleatoriamente();
  }

  verificar(): boolean {
    return true;
  }

  private generarPalabraAleatoriamente(): string {
    return this.palabras[Math.floor(Math.random() * this.palabras.length)];
  }

}