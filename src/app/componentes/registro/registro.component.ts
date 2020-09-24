import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  mostrarAviso = false;
  mostrarSpinner = false;
  aviso = '';

  registerForm = new FormGroup({
    apodo: new FormControl(''),
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

  async onRegister() {
    const {apodo, email, clave} = this.registerForm.value;
    this.mostrarSpinner = true;

    try {
      const cred = await this.authSvc.register(email, clave);

      this.aviso = 'Usted ha sido registrado exitosamente!!';

      await this.db.collection('usuarios').doc(cred.user.uid).set({
        apodo, email, clave, fechaIngreso: firestore.Timestamp.fromDate(new Date)
      });

    } catch (err) {

      switch (err.code) {
        case 'auth/invalid-email':
          this.aviso = 'El email ingresado no es válido';
          break;

        case 'auth/weak-password':
          this.aviso = 'La contraseña debe tener al menos 6 caracteres';
          break;

        case 'auth/email-already-in-use':
          this.aviso = 'Email ya está en uso';
          break;

        default:
          this.aviso = 'No se ha podido registrar el usuario';
          break;
      }

    } finally {
      this.mostrarAviso = true;
      this.mostrarSpinner = false;
    }
  }

  onVolver() {
    this.mostrarAviso = false;
    this.registerForm = new FormGroup({
      apodo: new FormControl(''),
      email: new FormControl(''),
      clave: new FormControl('')
    });
  }
}
