import { Juego } from './juego'

export class JuegoAgilidad extends Juego  {
  public primerNumero: number;
  public segundoNumero: number;
  public respuestaUsuario: number | string;
  public respuestaReal: number;
  public operador: string;

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super('Agilidad Aritmetica', gano, jugador);

    this.primerNumero = this.obtenerNumeroAleatoriamente(1,20);
    this.segundoNumero = this.obtenerNumeroAleatoriamente(1,10);
    this.operador = this.obtenerOperadorAleatoriamente();

     this.respuestaReal = 0;

    switch(this.operador) {
      case '+':
        this.respuestaReal = this.primerNumero + this.segundoNumero;
      break;

      case '*':
        this.respuestaReal = this.primerNumero * this.segundoNumero;
      break;

      case '-':
        this.respuestaReal = this.primerNumero - this.segundoNumero;
      break;

      case '/':
        this.respuestaReal = this.primerNumero / this.segundoNumero;
      break;
    }

    this.respuestaReal = parseFloat(this.respuestaReal.toFixed(1));
  } 

  verificar(): boolean {
    if(this.respuestaUsuario === undefined)
      this.respuestaUsuario = '';

    if(this.respuestaReal === parseFloat(this.respuestaUsuario.toString())) 
      this.gano = true;
    else 
      this.gano = false;

    return this.gano;  
  }

  obtenerNumeroAleatoriamente(min:number, max:number): number {
    return Math.floor(Math.random() * ((max+1) - min)) + min;
  }

  obtenerOperadorAleatoriamente(): string {
    let operadores = ['+', '/', '*', '-'];
    let numeroAleatorio = Math.floor(Math.random() * operadores.length);
    return  operadores[numeroAleatorio];
  }
}
