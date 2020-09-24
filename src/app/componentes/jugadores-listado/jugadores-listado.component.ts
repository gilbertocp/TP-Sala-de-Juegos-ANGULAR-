import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  listado: any;
  miJugadoresServicio: JugadoresService;

    constructor(serviceJugadores: JugadoresService,
                private router: Router) {
      this.miJugadoresServicio = serviceJugadores;
    }

  ngOnInit() {
  }


  TraerTodos(){
    // alert("totos");
    this.miJugadoresServicio.traertodos('jugadores/', 'todos').then(data => {
      // console.info("jugadores listado",(data));
      this.listado = data;

    });
  }
  TraerGanadores(){
    this.miJugadoresServicio.traertodos('jugadores/', 'ganadores').then(data => {
      // console.info("jugadores listado",(data));
      this.listado = data;

    });
  }
  TraerPerdedores(){
    this.miJugadoresServicio.traertodos('jugadores/', 'perdedores').then(data => {
      // console.info("jugadores listado",(data));
      this.listado = data;

    });
  }

}
