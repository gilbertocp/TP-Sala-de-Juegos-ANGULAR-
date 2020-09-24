import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public usuarioLogueado: boolean = null;
  public apodoUsuario = '';

  constructor(private authSvc: AuthService
  ) {  }

  async ngOnInit() {
  }

  async cerrarSesion() {
  }

}
