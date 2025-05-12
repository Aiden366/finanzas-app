import { Component, OnInit } from '@angular/core';
import { MovimientoService } from '../../services/movimiento.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resumen-mensual',
  templateUrl: './resumen-mensual.component.html',
  styleUrls: ['./resumen-mensual.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ResumenMensualComponent implements OnInit {
  ingresos: number = 0;
  gastos: number = 0;
  balance: number = 0;

  mesSeleccionado: number = new Date().getMonth() + 1;
  anioSeleccionado: number = new Date().getFullYear();

  meses = [
    { nombre: 'Enero', valor: 1 },
    { nombre: 'Febrero', valor: 2 },
    { nombre: 'Marzo', valor: 3 },
    { nombre: 'Abril', valor: 4 },
    { nombre: 'Mayo', valor: 5 },
    { nombre: 'Junio', valor: 6 },
    { nombre: 'Julio', valor: 7 },
    { nombre: 'Agosto', valor: 8 },
    { nombre: 'Septiembre', valor: 9 },
    { nombre: 'Octubre', valor: 10 },
    { nombre: 'Noviembre', valor: 11 },
    { nombre: 'Diciembre', valor: 12 }
  ];

  anios: number[] = [];

  constructor(private movimientoService: MovimientoService) {}

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.anios = Array.from({ length: 5 }, (_, i) => currentYear - i);
    this.cargarResumen();
  }

  cargarResumen() {
    this.movimientoService.obtenerMovimientos().subscribe({
      next: (data) => {
        const filtrados = data.filter(mov => {
          const fecha = new Date(mov.fecha);
          return (
            fecha.getMonth() + 1 === this.mesSeleccionado &&
            fecha.getFullYear() === this.anioSeleccionado
          );
        });

        this.ingresos = filtrados
          .filter(mov => mov.tipo === 'ingreso')
          .reduce((sum, mov) => sum + (typeof mov.monto === 'number' ? mov.monto : parseFloat(mov.monto || '0')), 0);

        this.gastos = filtrados
          .filter(mov => mov.tipo === 'gasto')
          .reduce((sum, mov) => sum + (typeof mov.monto === 'number' ? mov.monto : parseFloat(mov.monto || '0')), 0);


        this.balance = this.ingresos - this.gastos;
      },
      error: (err) => {
        console.error('Error al obtener movimientos:', err);
      }
    });
  }
}
