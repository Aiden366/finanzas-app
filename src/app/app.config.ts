import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),      // 👉 Necesario para usar HttpClient en servicios
    provideRouter(routes)     // 👈 También se necesita si usas rutas
  ]
};
