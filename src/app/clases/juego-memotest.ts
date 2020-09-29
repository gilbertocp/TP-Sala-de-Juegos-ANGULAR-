import { Juego } from './juego';
export class JuegoMemotest extends Juego {

  cartas = [
    {img: 'assets/imagenes/batido.png',      nombre: 'batido'},
    {img: 'assets/imagenes/fritas.png',      nombre: 'fritas'},
    {img: 'assets/imagenes/helado.png',      nombre: 'helado'},
    {img: 'assets/imagenes/pancho.png',      nombre: 'pancho'},
    {img: 'assets/imagenes/pizza.png',       nombre: 'pizza'},
    {img: 'assets/imagenes/hamburguesa.png', nombre: 'hamburguesa'},
    {img: 'assets/imagenes/batido.png',      nombre: 'batido'},
    {img: 'assets/imagenes/fritas.png',      nombre: 'fritas'},
    {img: 'assets/imagenes/helado.png',      nombre: 'helado'},
    {img: 'assets/imagenes/pancho.png',      nombre: 'pancho'},
    {img: 'assets/imagenes/pizza.png',       nombre: 'pizza'},
    {img: 'assets/imagenes/hamburguesa.png', nombre: 'hamburguesa'},
  ];

  constructor(nombre?: string, gano?: boolean, jugador?: string) {
    super('Memotest', gano, jugador);
  }
  
  verificar(): boolean {
    return true;
  }

  ordenarCartas(): void {
    this.cartas.sort(() => 0.5 * Math.random());
  }

  // algoritmo Fisher–Yates shuffle 
  barajarCartas(a: any[]): any[] {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
}