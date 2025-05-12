export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  password?: string; // no se envía desde backend
}
