import { Juego } from './juego';
export class JuegoAnagrama extends Juego{

  palabraJuego: string;
  palabraUsuario: string;

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super('Anagrama', gano, jugador);

    this.palabraJuego = this.generarPalabrasAleatoriamente();
    this.palabraUsuario = '';
  }

  private mapearPalabra(str: string): any {
    let charObj = {};
    str.replace(/[^\w]/g,"").toLowerCase();

    for(let char of str) 
      charObj[char] = charObj[char+1] || 1;
  
    return charObj;
  }

  public sonAnagramas(palabra1: string, palabra2: string): boolean {

    if(palabra1.length !== palabra2.length) return false;

    const palabra1Mapeada: any = this.mapearPalabra(palabra1);
    const palabra2Mapeada: any = this.mapearPalabra(palabra2);

    for(const idx in palabra1Mapeada)
      if(palabra1Mapeada[idx] !== palabra2Mapeada[idx]) return false;

    return true;
  }

  verificar(): boolean {
    this.gano = this.sonAnagramas(this.palabraJuego, this.palabraUsuario)
    return this.gano;
  }


  private generarPalabrasAleatoriamente(): string {
    const palabras = [
      'adios',
      'hola',
      'chau',
      'color',
      'gato',
      'zebra',
      'parque',
      'programación',
      'laptop',
      'roma',
      'hechos'
    ];
    return palabras[Math.floor(Math.random() * palabras.length)];
  }
}
