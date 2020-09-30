import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import { PartidasService } from '../../servicios/partidas/partidas.service';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.scss']
})
export class AnagramaComponent implements OnInit {

  nuevoJuego: JuegoAnagrama;

  constructor(private partidasSvc: PartidasService) {
    this.nuevoJuego = new JuegoAnagrama();
    console.log(this.nuevoJuego);
  }

  verificarPalabras() {
    if (this.nuevoJuego.verificar()) {
      this.nuevoJuego.gano = true;
      this.mostrarMensaje('Has ganado, las palabras son anagramas!!');
    }
    else {
      this.nuevoJuego.gano = false;
      this.mostrarMensaje('Has Perdido, las palabras no son anagramas!!');
    }

    this.partidasSvc.juegoTerminado(this.nuevoJuego);
    this.nuevoJuego = new JuegoAnagrama();
  }

  ngOnInit(): void {
  }

  mostrarMensaje(msj: string): void {
    (document.querySelector('#mensajeVentanaModal') as HTMLDivElement).innerHTML = msj;
    (document.querySelector('#botonVentanaModal') as HTMLButtonElement).click();
  }

}
