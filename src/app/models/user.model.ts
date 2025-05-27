export interface User {
  usuario: string;
  mail: string;
  contrasena: string;
  estado: boolean;
  idPersona: {
    idPersona: number; // clave foránea
  };
  rol: string;
}
