import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.scss']
})
export class AnagramaComponent implements OnInit {

  nuevoJuego: JuegoAnagrama;
  juegoGanado: boolean;

  constructor() {
    this.nuevoJuego = new JuegoAnagrama();
    this.juegoGanado = false;
    console.log(this.nuevoJuego);
  }

  verificarPalabras() {
    if (this.nuevoJuego.verificar()) {
      this.juegoGanado = true;
    }
    else {
      this.juegoGanado = false;
    }

    document.getElementById('botonVentanaModal').click();
    this.nuevoJuego = new JuegoAnagrama();
  }

  ngOnInit(): void {
  }

}
