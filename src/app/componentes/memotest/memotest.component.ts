import { Component, OnInit } from '@angular/core';
import { JuegoMemotest } from '../../clases/juego-memotest';
import { PartidasService } from '../../servicios/partidas/partidas.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  juegoNuevo: JuegoMemotest;
  juegoEmpezado: boolean;
  cartasSeleccionadas = [];
  cartasGanadas = [];

  constructor(private partidasSvc: PartidasService) {
    this.juegoEmpezado = false;
  }

  ngOnInit() {
  }

  empezarJuego(): void {
    this.juegoEmpezado = true;
    this.juegoNuevo = new JuegoMemotest();
    this.juegoNuevo.cartas = this.juegoNuevo.barajarCartas(this.juegoNuevo.cartas);
    this.cartasSeleccionadas = [];
    this.cartasGanadas = [];
  }

  verificarEmparejamiento(): void {
    const cartaUno: HTMLDivElement = this.cartasSeleccionadas[0];
    const cartaDos: HTMLDivElement = this.cartasSeleccionadas[1];

    const imgUno = cartaUno.children[1].children[0] as HTMLImageElement;
    const imgDos = cartaDos.children[1].children[0] as HTMLImageElement;

    if(cartaUno.id === cartaDos.id) {
      this.cartasSeleccionadas = [];
      return;
    }
    
    if(imgUno.name === imgDos.name) {
      cartaUno.className += ' emparejado';
      cartaDos.className += ' emparejado';
      this.cartasGanadas.push(imgUno);
    }
    else {
      cartaUno.style.transform = '';
      cartaDos.style.transform = '';
    }

    this.cartasSeleccionadas = [];

    if(this.cartasGanadas.length === this.juegoNuevo.cartas.length / 2) {
      this.juegoNuevo.gano = true;
      this.juegoEmpezado = false;
      this.partidasSvc.juegoTerminado(this.juegoNuevo);
      this.mostrarMensaje('Has encontrado todos los pares !!');
    }
  }

  voltearCarta(el: HTMLDivElement): void {
    if(el.classList.contains('emparejado'))
      return;

    if(this.cartasSeleccionadas.length < 2) {
      el.style.transform = !el.style.transform? 'rotateY(180deg)': '';
      this.cartasSeleccionadas.push(el);
    }
    
    if(this.cartasSeleccionadas.length === 2) {
      setTimeout(() => this.verificarEmparejamiento(), 500);
    }
  }

  mostrarMensaje(msj: string): void {
    (document.querySelector('#mensajeVentanaModal') as HTMLDivElement).innerHTML = msj;
    (document.querySelector('#botonVentanaModal') as HTMLButtonElement).click();
  }
}
