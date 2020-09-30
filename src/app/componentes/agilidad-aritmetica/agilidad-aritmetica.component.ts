import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuego: JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;
  comenzado = false;
  juegoGanado = false;

  ngOnInit() {
  }

  constructor() {
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
          this.enviarJuego.emit(this.nuevoJuego);
          console.log(this.nuevoJuego, 'Gano');
          this.juegoGanado = true;
        }
        else {
          
          console.log(this.nuevoJuego, 'Perdio');
          this.juegoGanado = false;

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
