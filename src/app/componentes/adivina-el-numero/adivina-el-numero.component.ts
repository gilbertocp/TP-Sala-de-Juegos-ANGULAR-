import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { timestamp } from 'rxjs/operators';
import { JuegoAdivina } from '../../clases/juego-adivina';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
 @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();

  nuevoJuego: JuegoAdivina;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;
  mostrarAyuda = false;

  constructor() {
    this.nuevoJuego = new JuegoAdivina();
    console.info('numero Secreto:', this.nuevoJuego.numeroSecreto);
    this.ocultarVerificar = true;
  }
  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.nuevoJuego.numeroIngresado = 0;
    this.contador = 0;
    this.ocultarVerificar = false;
    (document.querySelector('#numeroIngresado') as HTMLInputElement).removeAttribute('readonly');
  }
  verificar() {
    this.contador++;
    console.info('numero Secreto:', this.nuevoJuego.gano);
    if (this.nuevoJuego.verificar()) {
      this.enviarJuego.emit(this.nuevoJuego);
      this.nuevoJuego.numeroSecreto = 0;
      this.nuevoJuego.numeroIngresado = 0;
      this.ocultarVerificar = true;
      this.mostrarAyuda = false;
      (document.querySelector('#numeroIngresado') as HTMLInputElement).setAttribute('readonly', 'readonly');
    } else {
      let mensaje: string;
      switch (this.contador) {
        case 1:
          mensaje = 'No, intento fallido, animo';
          break;
          case 2:
          mensaje = 'No,Te estaras Acercando???';
          break;
          case 3:
          mensaje = 'No es, Yo crei que la tercera era la vencida.';
          break;
          case 4:
          mensaje = 'No era el  ' + this.nuevoJuego.numeroIngresado;
          break;
          case 5:
          mensaje = this.contador + ' intentos y nada.';
          break;
          case 6:
          mensaje = 'Afortunado en el amor';
          break;

        default:
            mensaje = 'Ya le erraste ' + this.contador + ' veces';
            break;
      }
      this.mostrarAyuda = true;
      this.MostarMensaje(this.nuevoJuego.retornarAyuda() + ' - ' + mensaje);
    }
    console.info('numero Secreto:', this.nuevoJuego.gano);
  }

  MostarMensaje(mensaje: string= 'este es el mensaje', ganador: boolean= false) {
    this.Mensajes = mensaje;
  }

  ngOnInit() {
  }

}
