import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoListaComponent } from './movimiento-lista.component';

describe('MovimientoListaComponent', () => {
  let component: MovimientoListaComponent;
  let fixture: ComponentFixture<MovimientoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
