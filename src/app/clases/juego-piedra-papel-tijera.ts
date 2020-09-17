import { Juego } from './juego';

export class JuegoPiedraPapelTijera extends Juego{

  eleccionUsuario: string;
  eleccionJuego: string;

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super('Piedra Papel y Tijera', gano, jugador);
    
    this.eleccionJuego = this.generarEleccionJuego();
    this.eleccionUsuario = '';
  }

  private generarEleccionJuego(): string {
    const opciones = ['rock', 'paper', 'scissors'];
    return opciones[Math.floor(Math.random() * opciones.length)];
  }

  verificar() : boolean {
    if(this.eleccionJuego === 'scissors' && this.eleccionUsuario === 'paper') return false;
    if(this.eleccionJuego === 'paper' && this.eleccionUsuario === 'rock') return false;
    if(this.eleccionJuego === 'rock' && this.eleccionUsuario === 'scissors') return false;

    if(this.eleccionUsuario === 'scissors' && this.eleccionJuego === 'paper') return true;
    if(this.eleccionUsuario === 'paper' && this.eleccionJuego === 'rock') return true;
    if(this.eleccionUsuario === 'rock' && this.eleccionJuego === 'scissors') return true;

    return false;
  }
} 
