import { Component, OnInit } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad';
import { PartidasService } from '../../servicios/partidas/partidas.service';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  nuevoJuego: JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;
  comenzado = false;
  juegoGanado = false;

  ngOnInit() {
  }

  constructor(private partidasSvc: PartidasService) {
      this.ocultarVerificar = true;

      this.Tiempo = 5;

      this.nuevoJuego = this.generarNuevaOperacion();
      this.nuevoJuego.primerNumero = 0;
      this.nuevoJuego.segundoNumero = 0;
      this.nuevoJuego.operador = '?';

      console.log(this.nuevoJuego);
      console.info('Inicio agilidad');
  }

  NuevoJuego() {
    this.nuevoJuego = this.generarNuevaOperacion();
    this.ocultarVerificar = false;
    this.repetidor = setInterval(() => {

      this.Tiempo--;
      console.log('llego', this.Tiempo);
      if (this.Tiempo == 0 ) {
        // clearInterval(this.repetidor);
        if (this.nuevoJuego.verificar()) {
          console.log(this.nuevoJuego, 'Gano');
          this.juegoGanado = true;
          this.nuevoJuego.gano = true;
          this.partidasSvc.juegoTerminado(this.nuevoJuego);
        }
        else {
          
          console.log(this.nuevoJuego, 'Perdio');
          this.juegoGanado = false;
          this.nuevoJuego.gano = false;
          this.partidasSvc.juegoTerminado(this.nuevoJuego);
        }
        document.getElementById('botonVentanaModal').click();

        this.verificar();
        this.ocultarVerificar = true;
        this.Tiempo = 5;

        this.nuevoJuego.gano = false;
        this.nuevoJuego.primerNumero = 0;
        this.nuevoJuego.segundoNumero = 0;
        this.nuevoJuego.operador = '?';

      }
      }, 900);
  }

  verificar() {
    this.ocultarVerificar = false;
    clearInterval(this.repetidor);
  }

  generarNuevaOperacion() {
    return new JuegoAgilidad();
  }

}
