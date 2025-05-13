import { Component, OnInit } from '@angular/core';
import { MovimientoService, Movimiento } from '../../services/movimiento.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-movimiento-lista',
  templateUrl: './movimiento-lista.component.html',
  styleUrls: ['./movimiento-lista.component.css'],
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,     // ESTE ES NECESARIO PARA <input matInput>
  MatListModule
  ]
})

export class MovimientoListaComponent implements OnInit {
  movimientos: Movimiento[] = [];
  movimiento: Movimiento | null = null;
  ingresos: number = 0;
  gastos: number = 0;
  balance: number = 0;

  filtroDescripcion: string = '';
  filtroTipo: string = '';
  filtroCategoria: number | null = null;
  filtroBusqueda: string = '';


  categorias: { id: number; nombre: string }[] = [];

  constructor(
    private movimientoService: MovimientoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit() {
    this.cargarMovimientos();
    this.cargarCategorias();
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.cargarMovimiento(id);
      }
    });
  }

  guardarMovimiento() {
    if (this.movimiento && this.movimiento.id) {
      // Actualizar movimiento
      this.movimientoService.actualizarMovimiento(this.movimiento.id, this.movimiento).subscribe({
        next: () => {
          this.router.navigate(['/movimientos']);
        },
        error: (err) => {
          console.error('Error al actualizar movimiento', err);
        },
      });
    } else if (this.movimiento) {
      // Crear movimiento
      this.movimientoService.crearMovimiento(this.movimiento).subscribe({
        next: () => {
          this.router.navigate(['/movimientos']);
        },
        error: (err) => {
          console.error('Error al crear movimiento', err);
        },
      });
    }
  }




  cargarMovimiento(id: number) {
    this.movimientoService.obtenerMovimientoPorId(id).subscribe({
      next: (mov) => {
        this.movimiento = mov;
      },
      error: (err) => {
        console.error('Error al cargar movimiento para edición:', err);
      }
    });
  }



  cargarMovimientos() {
    // Convertimos null en undefined para el filtro de categoría
    const categoriaFiltro = this.filtroCategoria !== null ? this.filtroCategoria : undefined;

    this.movimientoService.obtenerMovimientos(this.filtroTipo, categoriaFiltro).subscribe({
      next: (data: Movimiento[]) => {
        this.movimientos = data;
      },
      error: (err: any) => {
        console.error('Error al cargar movimientos:', err);
      }
    });
  }

  cargarCategorias() {
    // Aquí deberías cargar las categorías desde tu servicio
    // Por ahora, usaremos datos de ejemplo
    this.categorias = [
      { id: 1, nombre: 'Alimentación' },
      { id: 2, nombre: 'Transporte' },
      { id: 3, nombre: 'Entretenimiento' }
    ];
  }
  calcularResumenMensual() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // 0-11 (enero es 0)

    // Filtramos los movimientos para este mes
    const filtrados = this.movimientos.filter(mov => new Date(mov.fecha).getMonth() === mesActual);

    this.ingresos = filtrados
      .filter(mov => mov.tipo === 'ingreso')
      .reduce((sum, mov) => sum + parseFloat(mov.monto.toString()), 0);

    this.gastos = filtrados
      .filter(mov => mov.tipo === 'gasto')
      .reduce((sum, mov) => sum + parseFloat(mov.monto.toString()), 0);
  }

  movimientosFiltrados(): Movimiento[] {
    // Filtrado adicional en el cliente por si es necesario
    let movimientos = this.movimientos;

    if (this.filtroTipo) {
      movimientos = movimientos.filter(mov => mov.tipo === this.filtroTipo);
    }

    if (this.filtroCategoria !== null) {
      movimientos = movimientos.filter(mov =>
        mov.categoria_id === this.filtroCategoria ||
        (mov.categoria && mov.categoria.id === this.filtroCategoria)
      );
    }
    if (this.filtroBusqueda.trim() !== '') {
      const busqueda = this.filtroBusqueda.toLowerCase();
      movimientos = movimientos.filter(mov =>
        mov.descripcion?.toLowerCase().includes(busqueda) ||
        mov.categoria?.nombre?.toLowerCase().includes(busqueda)
      );
    }


    return movimientos;
  }

  obtenerNombreCategoria(categoriaId: number): string {
    const categoria = this.categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nombre : 'Desconocida';
  }


  onFiltroCambio(): void {
    // Convertir a número si es necesario (para consistencia)
    if (this.filtroCategoria !== null) {
      this.filtroCategoria = Number(this.filtroCategoria);
    }
    this.cargarMovimientos();
  }

  eliminarMovimiento(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este movimiento?')) {
      this.movimientoService.eliminarMovimiento(id).subscribe({
        next: () => {
          this.cargarMovimientos(); // Recargar después de eliminar
        },
        error: (err) => {
          console.error('Error al eliminar movimiento', err);
        }
      });
    }
  }

  editarMovimiento(id: number) {
    console.log('ID recibido para editar:', id);

    this.movimientoService.obtenerMovimientoPorId(id).subscribe({
      next: (mov: Movimiento) => {
        console.log('Movimiento recibido para edición:', mov);
        this.router.navigate(['/movimiento-formulario'], { state: { movimiento: mov } })
        .then(success => {
          console.log('Navegación exitosa:', success);
        })
        .catch(error => {
          console.error('Error al navegar:', error);
        });
            },
      error: (err) => {
        console.error('Error al cargar movimiento para edición:', err);
      }
    });
  }





}
