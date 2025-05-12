export interface Movimiento {
  id?: number;  // opcional para nuevos registros
  tipo: 'ingreso' | 'gasto';
  monto: number;
  descripcion: string;
  fecha: string; // formato ISO (ej. '2025-05-10')
  categoria_id: number;
  usuario_id?: number;  // opcional si hay autenticación
}

