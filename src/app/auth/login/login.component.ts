// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    usuario: '',
    contrasena: ''
  };

  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.error = '';

    const loginPayload = {
      usuario: this.user.usuario.trim(),
      contrasena: this.user.contrasena
    };

    this.authService.login(loginPayload).subscribe({
      next: (res) => {
        if (res.codigoRespuesta === '1' && res.objeto) {
          const loginResponse = res.objeto;
          localStorage.setItem('token', loginResponse.token);
          localStorage.setItem('idPersona', loginResponse.usuario.idPersona.toString());
          this.router.navigate(['/presentacion']);
        } else {
          this.error = res.mensajeRespuesta || 'Usuario o contraseña incorrectos';
        }
      },
      error: () => {
        this.error = 'Error en la conexión al servidor';
      }
    });
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
}
