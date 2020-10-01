import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartidasService } from '../../servicios/partidas/partidas.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  constructor(public partidasSvc: PartidasService) { 
  }

  ngOnInit() {  }
}
