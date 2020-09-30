import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mostrarAviso = false;
  mostrarSpinner = false;
  aviso = '';

  loginForm = new FormGroup({
    email: new FormControl(''),
    clave: new FormControl('')
  });

  constructor(
    private authSvc: AuthService,
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authSvc.isLogged()) { this.router.navigate(['/Principal']); }
  }

  async onLogin() {
    const {email, clave} = this.loginForm.value;
    this.mostrarSpinner = true;

    try {
      const cred = await this.authSvc.login(email, clave);

      await this.db.collection('usuariosLog').add({
        email, fechaIngreso: firestore.Timestamp.fromDate(new Date())
      });

      localStorage.setItem('key_saladejuegos', JSON.stringify(cred));

      this.router.navigate(['/Principal']);
    } catch (err) {

      switch (err.code) {
        case 'auth/wrong-password':
          this.aviso = 'La contraseña ingresada no es válida';
          break;

        case 'auth/invalid-email':
          this.aviso = 'El email ingresado no es válido';
          break;

        case 'auth/user-not-found':
          this.aviso = 'El usuario no está registrado';
          break;

        default:
          this.aviso = 'No se ha podido iniciar sesión, Intentelo de nuevo';
          break;
      }

      this.mostrarAviso = true;
    } finally {
      this.mostrarSpinner = false;
    }
  }

  ingresarInvitado(): void {
    this.mostrarAviso = false;
    this.loginForm = new FormGroup({
      email: new FormControl('invitado@invitado.com'),
      clave: new FormControl('invitado')
    });
    (document.querySelector('#btnSubmitLogin') as HTMLFormElement).click();
  }

  onVolver() {
    this.mostrarAviso = false;
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      clave: new FormControl('')
    });
  }
}
