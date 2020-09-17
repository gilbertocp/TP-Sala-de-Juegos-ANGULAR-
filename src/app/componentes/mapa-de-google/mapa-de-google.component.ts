import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa-de-google',
  templateUrl: './mapa-de-google.component.html',
  styleUrls: ['./mapa-de-google.component.css']
})
export class MapaDeGoogleComponent implements OnInit {
  title = 'El Primer mapa';
  lat = 33.678418;
  lng = 5.809007;
  // google maps zoom level
  zoom = 8;

  constructor() { }

  ngOnInit() {
  }
  mapClicked(e: Event){

  }
}

