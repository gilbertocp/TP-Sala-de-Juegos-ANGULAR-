import { Component, OnInit } from '@angular/core';
import { PartidasService } from '../../servicios/partidas/partidas.service';
import { JuegoElAhorcado } from '../../clases/juego-elahorcado';

@Component({
  selector: 'app-elahorcado',
  templateUrl: './elahorcado.component.html',
  styleUrls: ['./elahorcado.component.css'],
})
export class ElahorcadoComponent implements OnInit {

  juegoNuevo: JuegoElAhorcado;
  urlImg: string;
  intentos: number;
  reiniciar: boolean;
  letrasIngresadas = [];
  letrasIngresadasCorrectas = [];


  constructor(private partidasSvc: PartidasService) {
    this.iniciarJuego();
    window.addEventListener('keyup', this.letraIngresada.bind(this)); 
  }

  ngOnInit() {  }

  iniciarJuego(): void {
    this.juegoNuevo = new JuegoElAhorcado();
    console.log(this.juegoNuevo.palabraAdivinar);
    this.letrasIngresadas = [];
    this.letrasIngresadasCorrectas = [];
    this.intentos = 0;
    this.reiniciar = true;
    this.urlImg = `assets/imagenes/ahorcado_img/`;
  }

  letraIngresada(e: KeyboardEvent): void {

    if(!e.key.match(/^[A-Za-z]$/))
      return;

    if(this.letrasIngresadas.includes(e.key)) {
      this.mostrarMensaje('Ya ingresaste la letra '+ e.key +', proba con otra');
      return;
    }

    if(this.verificarLetra(e.key)) {
      const letras = Array.from(document.querySelectorAll('.letra')) as HTMLDivElement[];
      const indices = []; 
      
      this.juegoNuevo.palabraAdivinar.split('').forEach((letra, idx) => {
        if(letra === e.key)
          return indices.push(idx);
      });

      indices.forEach(idx => {
        letras[idx].innerHTML = e.key;
        this.letrasIngresadasCorrectas.push(e.key);
      });

      this.letrasIngresadas.push(e.key);
    }
    else {
      this.sumarIntentosFallidos();
      this.letrasIngresadas.push(e.key);
    }

    if(this.verificarJuego()) {
      setTimeout(() => this.iniciarJuego(), 1000);
    }
  }

  verificarJuego(): boolean {
    let finDelJuego = false;

    if(this.intentos > 5){ 
      finDelJuego = true;
    }

    
    if(this.letrasIngresadasCorrectas.length === this.juegoNuevo.palabraAdivinar.split('').length) {
      this.juegoNuevo.gano = true;
      finDelJuego = true;
    }

    if(finDelJuego) {
      this.reiniciar = false;
      this.partidasSvc.juegoTerminado(this.juegoNuevo);
      this.mostrarMensaje(
        this.juegoNuevo.gano 
        ? 'Has ganado, lograste adivinar la palabra !!'
        : `Perdista, la palabra era ${this.juegoNuevo.palabraAdivinar}`
      );
    }

    return finDelJuego;
  }

  verificarLetra(letra: string): Boolean {
    return this.juegoNuevo.palabraAdivinar.split('').includes(letra);
  }
  
  sumarIntentosFallidos(): void {
    this.intentos++;
  }

  mostrarMensaje(msj: string): void {
    (document.querySelector('#mensajeVentanaModal') as HTMLDivElement).innerHTML = msj;
    (document.querySelector('#botonVentanaModal') as HTMLButtonElement).click();
  }
}
