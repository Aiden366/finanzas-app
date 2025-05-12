import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';



export interface Movimiento {
  id: number;
  tipo: string;
  monto: number;
  descripcion?: string;
  fecha: string;
  categoria_id: number;
  usuario_id: number;
  categoria?: {
    id: number;
    nombre: string;
  };
}



@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private apiUrl = 'http://localhost:3000/api/movimientos';

  constructor(private http: HttpClient) {}

  // Métodos para obtener movimientos (combinación de ambos enfoques)
  getMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.apiUrl);
  }


  obtenerMovimientos(tipo?: string, categoria_id?: number): Observable<Movimiento[]> {
    let params: any = {};

    if (tipo) params.tipo = tipo;
    if (categoria_id !== null && categoria_id !== undefined) {
      params.categoria_id = categoria_id;
    }

    return this.http.get<Movimiento[]>(this.apiUrl, { params }).pipe(
      map((movimientos: Movimiento[]) => {
        // Asegúrate de que el monto sea tratado como número
        movimientos.forEach(mov => {
          // Verificar si el monto es un número
          mov.monto = isNaN(parseFloat(mov.monto.toString())) ? 0 : parseFloat(mov.monto.toString());
        });
        return movimientos;
      })
    );
  }




  // Métodos CRUD
  agregarMovimiento(movimiento: Movimiento): Observable<Movimiento> {
    return this.http.post<Movimiento>(this.apiUrl, movimiento);
  }

  actualizarMovimiento(id: number, movimiento: Movimiento): Observable<Movimiento> {
    return this.http.put<Movimiento>(`${this.apiUrl}/${id}`, movimiento);
  }


  eliminarMovimiento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  obtenerMovimientoPorId(id: number): Observable<Movimiento> {
    return this.http.get<Movimiento>(`${this.apiUrl}/${id}`);
  }
  // Crear movimiento
  crearMovimiento(movimiento: Movimiento): Observable<Movimiento> {
    return this.http.post<Movimiento>(this.apiUrl, movimiento);
  }



}