// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MovimientoListaComponent } from './components/movimiento-lista/movimiento-lista.component';
import { MovimientoFormularioComponent } from './components/movimiento-formulario/movimiento-formulario.component';

export const routes: Routes = [
  { path: '', component: MovimientoListaComponent },
  { path: 'nuevo', component: MovimientoFormularioComponent },
  { path: '**', redirectTo: '' }
];
