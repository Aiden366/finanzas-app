import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoFormularioComponent } from './movimiento-formulario.component';

describe('MovimientoFormularioComponent', () => {
  let component: MovimientoFormularioComponent;
  let fixture: ComponentFixture<MovimientoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
