import { Component, OnInit } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';
import { PartidasService } from '../../servicios/partidas/partidas.service';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  nuevoJuego: JuegoPiedraPapelTijera;
  seleccionado: boolean;

  constructor(private partidasSvc: PartidasService) {
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    this.seleccionado = false;
  }

  ngOnInit(): void {
  }

  opcionSeleccionada(e: Event): void {
    this.nuevoJuego.eleccionUsuario = (e.target as HTMLButtonElement).getAttribute('data-figura');
    this.seleccionado = true;

    if (this.nuevoJuego.verificar()) {
      this.nuevoJuego.gano = true;
    }
    else {
      this.nuevoJuego.gano = false;
    }

    this.partidasSvc.juegoTerminado(this.nuevoJuego);

    document.getElementById('botonVentanaModal').click();
  }

  volverAJugar(): void{
    this.seleccionado = false;
    this.nuevoJuego = new JuegoPiedraPapelTijera();
  }
}
