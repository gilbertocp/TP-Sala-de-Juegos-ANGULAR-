import { Component, OnInit } from '@angular/core';
import { JuegoTateti } from '../../clases/juego-tateti';
import { timer } from 'rxjs';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  nuevoJuego: JuegoTateti;
  juegoGanado: boolean;
  juegoIniciado: boolean;
  turno: boolean; // si es true el turno de juegador, caso contrario false

  constructor() {
    this.nuevoJuego = new JuegoTateti();
    this.juegoGanado = false;
    this.juegoIniciado = false;
  }

  ngOnInit(): void {
  }

  dibujar(e: Event): void {
    if (this.turno) {
      (e.target as HTMLDivElement).className += ` ${this.nuevoJuego.seleccionUsuario}`;
      (e.target as HTMLDivElement).innerHTML = `<span class="display-2">${this.nuevoJuego.seleccionUsuario === 'Circulo' ? 'O' : 'X'}</span>`;

      if (this.verificarJuego()) {
        return;
      }

      this.turno = !this.turno;
      this.figuraOponente();
    }else {
      if (e === null) {
        this.figuraOponente();
      }
    }
  }

  figuraSeleccionada(e: Event): void {
    const clases = (e.currentTarget as HTMLButtonElement).classList;
    this.turno = ([true, false])[Math.floor(Math.random() * 2)];
    this.nuevoJuego = new JuegoTateti();

    clases.forEach((clase: string) => {
      if (clase === 'btnCirculo') {
        this.nuevoJuego.seleccionUsuario = 'Circulo';
        this.nuevoJuego.seleccionComputadora = 'Equis';
      }

      if (clase === 'btnEquis') {
        this.nuevoJuego.seleccionUsuario = 'Equis';
        this.nuevoJuego.seleccionComputadora = 'Circulo';
      }
    });

    this.juegoIniciado = true;
    if (!this.turno) {
      setTimeout(() => this.dibujar(null), 350);
    }
  }

  figuraOponente(): void {
    if (!this.turno){
      const celdas = document.querySelectorAll('.celda') as NodeListOf<HTMLDivElement>;
      timer(1000).subscribe(() => {
        for (const el of Array.from(celdas)) {
          if (!el.innerHTML){
            el.className += ` ${this.nuevoJuego.seleccionComputadora}`;
            el.innerHTML =  `<span class="display-2">${this.nuevoJuego.seleccionComputadora === 'Circulo' ? 'O' : 'X'}</span>`;
            break;
          }
        }

        if (this.verificarJuego()) {
          return;
        }

        this.turno = !this.turno;
      });
    }
  }

  verificarGanador(figura: string): boolean {
    const celdas = document.querySelectorAll('.celda') as NodeListOf<HTMLDivElement>;

    return this.nuevoJuego.COMBINACIONES_GANAR.some(combinacion => {
      return combinacion.every(idx => (Array.from(celdas)[idx]).classList.contains(figura));
    });
  }

  empate(): boolean {
    const celdas = document.querySelectorAll('.celda') as NodeListOf<HTMLDivElement>;
    return Array.from(celdas).every(celda => celda.classList.contains('Circulo') || celda.classList.contains('Equis'));
  }

  verificarJuego(): boolean {
    let ret = false;

    if (this.verificarGanador(this.turno ? this.nuevoJuego.seleccionUsuario : this.nuevoJuego.seleccionComputadora)) {
      this.nuevoJuego.gano = this.turno ? true : false;
      ret = true;
    }
    else if (this.empate()) {
      this.nuevoJuego.gano = false;
      ret = true;
    }

    if (ret) {
      this.finDelJuego();
    }

    return ret;
  }

  finDelJuego(): void {
    (document.querySelector('#botonVentanaModal') as HTMLButtonElement).click();
    this.juegoIniciado = !this.juegoIniciado;
  }
}
