import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { ApiResponse, LoginResponse, LoginRequest } from '../models/login-response.model';
import { RegisterDto } from '../models/register.model';
import { PersonaDto } from '../models/persona.model';
import { tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth/Usuarios';
  private personaUrl = '/api/auth';

  constructor(private http: HttpClient) { }

  // Login solo envía usuario y contrasena, pero usamos User completo por tipo
  login(payload: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    console.log('Datos enviados:', payload);
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, payload).pipe(
      tap((res) => {
        if (res.codigoRespuesta === '1' && res.objeto) {
          localStorage.setItem('token', res.objeto.token); // Guarda el token
          localStorage.setItem('idPersona', res.objeto.usuario.idPersona.toString()); // ← Aquí corregido
        }
      })
    );
  }


  register(registerData: RegisterDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData);
  }

  saveLogin(loginData: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, loginData);
  }

  getPersonaById(idPersona: number) {
    return this.http.get<ApiResponse<PersonaDto>>(`${this.personaUrl}/persona/${idPersona}`);
  }

}
