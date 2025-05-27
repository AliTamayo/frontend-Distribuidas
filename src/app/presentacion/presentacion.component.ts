import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PersonaDto } from '../models/persona.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-presentacion',
  standalone: false,
  templateUrl: './presentacion.component.html',
  styleUrl: './presentacion.component.css'
})

export class PresentacionComponent implements OnInit {
  persona!: PersonaDto;
  error = '';
  opcionSeleccionada = '';
  accesoDenegado = false;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const idPersona = Number(localStorage.getItem('idPersona'));
    if (idPersona) {
      this.authService.getPersonaById(idPersona).subscribe({
        next: (res) => {
          if (res.codigoRespuesta === '1') {
            this.persona = res.objeto;
          } else {
            this.error = 'No se pudo cargar la información de la persona';
          }
        },
        error: () => {
          this.error = 'Error al consultar datos de la persona';
        }
      });
    } else {
      this.error = 'ID de persona no encontrado';
    }
  }

  ingresar() {
    if (this.opcionSeleccionada === this.persona.rol.toLowerCase()) {
      this.userService.setPersona(this.persona); // Guardamos los datos
      if (this.opcionSeleccionada === 'paciente') {
        this.router.navigate(['/paciente/dashboard']);
      } else if (this.opcionSeleccionada === 'medico') {
        this.router.navigate(['/medico/dashboard']);
      }
    } else {
      this.accesoDenegado = true;
    }
  }
}
