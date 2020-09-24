import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(
    public authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  cerrarSesion(): void {
    localStorage.removeItem('key_saladejuegos');
    this.authSvc.logout()
      .then(() => this.router.navigate(['/Login']))
      .catch(() => this.router.navigate(['/Principal']));
  }
}
