
import { Component, OnInit , Input, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {

  @Input() listado: Observable<any>;

  constructor() { }

  ngOnInit() {

  }

}
