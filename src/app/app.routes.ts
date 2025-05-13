// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MovimientoListaComponent } from './components/movimiento-lista/movimiento-lista.component';
import { MovimientoFormularioComponent } from './components/movimiento-formulario/movimiento-formulario.component';

export const routes: Routes = [
  { path: 'movimientos', component: MovimientoListaComponent },
  { path: 'nuevo', component: MovimientoFormularioComponent },
  { path: 'movimiento-formulario', component: MovimientoFormularioComponent },
  { path: '', redirectTo: 'movimientos', pathMatch: 'full' },
  { path: '**', redirectTo: 'movimientos' } // Wildcard al final SIEMPRE
];


