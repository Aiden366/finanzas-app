import { Component } from '@angular/core';
import { MovimientoService, Movimiento } from '../../services/movimiento.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimiento-formulario',
  templateUrl: './movimiento-formulario.component.html',
  styleUrls: ['./movimiento-formulario.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ]
})
export class MovimientoFormularioComponent {
  form: FormGroup;

  tipos = ['ingreso', 'gasto'];
  categorias = [
    { id: 1, nombre: 'Alimentación' },
    { id: 2, nombre: 'Transporte' },
    { id: 3, nombre: 'Entretenimiento' }
  ];
  constructor(private router: Router, private fb: FormBuilder, private movimientoService: MovimientoService) {
    const navigation = this.router.getCurrentNavigation();
    const movimiento = navigation?.extras?.state?.['movimiento'] || null;

    this.form = this.fb.group({
      tipo: ['ingreso', Validators.required],
      monto: [0, [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      fecha: [new Date().toISOString().split('T')[0], Validators.required],
      categoria_id: [1, Validators.required]
    });

    if (movimiento) {
      console.log('Movimiento recibido en formulario:', movimiento);
      this.form.patchValue(movimiento);
    }
  }

  guardar() {
    if (this.form.valid) {
      const movimiento: Movimiento = {
        ...this.form.value,
        usuario_id: 1 // Asumiendo un ID de usuario fijo por ahora
      };
      this.movimientoService.agregarMovimiento(movimiento).subscribe({
        next: (res: Movimiento) => {
          alert('Movimiento registrado');
          this.resetearFormulario();
        },
        error: (err: any) => {
          console.error(err);
          alert('Error al registrar movimiento');
        }
      });
    }
  }

  resetearFormulario() {
    this.form.reset({
      tipo: 'ingreso',
      monto: 0,
      descripcion: '',
      fecha: new Date().toISOString().split('T')[0],
      categoria_id: 1,
    });
  }
}
