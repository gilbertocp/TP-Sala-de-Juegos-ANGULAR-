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

  celdasDibujadas: HTMLDivElement[] = [];
  celdasDibujadasUsuario: HTMLDivElement[] = [];
  celdasDibujadasComputadora: HTMLDivElement[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  cambiarTurnos(): void {
    this.turno = !this.turno;

    if(this.turno === false) 
      setTimeout(() => this.dibujarComputadora(), 250);
  }

  dibujarUsuario(el: HTMLDivElement): void {

    if(this.turno !== true) {
      alert('Espera que no es tu turno');
      return;
    }

    const celdaYaEstaDibujada = this.celdasDibujadas.some(celda => celda.id === el.id);
    
    if(celdaYaEstaDibujada) {
      alert('Esta celda ya esta dibujada escoje otra');
      return;
    }

    el.className += ' ' + this.nuevoJuego.seleccionUsuario;
    el.innerHTML += this.nuevoJuego.seleccionUsuario === 'Equis' ? 'X' : 'O';
    
    this.celdasDibujadas.push(el);
    this.celdasDibujadasUsuario.push(el);

    if(!this.verificarJuego())
      this.cambiarTurnos();
  }

  dibujarComputadora(): void {
    const celdas = Array.from(document.getElementsByClassName('celda')) as HTMLDivElement[];
    
    const celdasVacias = celdas.filter(cel => {
      return !this.celdasDibujadas.some(cel2 => cel2.id === cel.id);
    });

    const celdaADibujar = celdasVacias[Math.floor(Math.random() * celdasVacias.length)];

    celdaADibujar.className += ' ' + this.nuevoJuego.seleccionComputadora;
    celdaADibujar.innerHTML += this.nuevoJuego.seleccionComputadora === 'Equis'? 'X' : 'O';

    this.celdasDibujadas.push(celdaADibujar);
    this.celdasDibujadasComputadora.push(celdaADibujar);

    if(!this.verificarJuego())
      this.cambiarTurnos();
  }

  figuraSeleccionada(e: Event): void {
    const clases = (e.currentTarget as HTMLButtonElement).classList;
    this.nuevoJuego = new JuegoTateti();
    
    // Elegir aletoriamente el turno (True => usuario, False => CPU)
    this.turno = ([true, false])[Math.floor(Math.random() * 2)];

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
    this.turno = true;
    // if (!this.turno) {
    //   setTimeout(() => this.dibujarComputadora(), 150);
    // }
  }

  verificarGanador(celdasDibujadas: HTMLDivElement[]): boolean {
    return this.nuevoJuego.COMBINACIONES_GANAR.some(combinacion => {
      let contador = 0;

      celdasDibujadas.forEach(celda => {
        if( combinacion.includes(parseInt(celda.id)) ) {
          contador++;
        }
      });

      return contador === 3;
    });
  }

  celdasLlenas(): boolean {
    return this.celdasDibujadas.length === document.getElementsByClassName('celda').length;
  }

  verificarJuego(): boolean {
    let finDelJuego = false;
    
    if(this.verificarGanador(this.celdasDibujadasUsuario)){
      alert('El usuario gana')
      finDelJuego = true
    }
    else if(this.verificarGanador(this.celdasDibujadasComputadora)){
      alert('Computadora gana')
      finDelJuego = true;
    }
    else if(this.celdasLlenas()) {
      alert('Hay empate');
      finDelJuego = true;
    }

    return finDelJuego;
  }

  finDelJuego(): void {
  }
}
