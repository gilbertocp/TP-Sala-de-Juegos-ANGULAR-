import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores/jugadores.service';

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  constructor(public jugadoresSvc: JugadoresService) {  }

  ngOnInit() {  }
}
