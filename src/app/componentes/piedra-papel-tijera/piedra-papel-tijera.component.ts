import { Component, OnInit } from '@angular/core';
import { isThisTypeNode } from 'typescript';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  nuevoJuego: JuegoPiedraPapelTijera;
  seleccionado: boolean;

  constructor() { 
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    this.seleccionado = false;
    console.log(this.nuevoJuego);
  }

  ngOnInit(): void {
  }

  opcionSeleccionada(e: Event): void {
    this.nuevoJuego.eleccionUsuario = (e.target as HTMLButtonElement).getAttribute('data-figura');
    this.seleccionado = true;

    if(this.nuevoJuego.verificar()) 
      this.nuevoJuego.gano = true;
    else
      this.nuevoJuego.gano = false;

    document.getElementById("botonVentanaModal").click();
  }

  volverAJugar(): void{
    this.seleccionado = false;
    this.nuevoJuego = new JuegoPiedraPapelTijera();
  }
}
