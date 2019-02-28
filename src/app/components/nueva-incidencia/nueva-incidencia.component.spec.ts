import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaIncidenciaComponent } from './nueva-incidencia.component';

describe('NuevaIncidenciaComponent', () => {
  let component: NuevaIncidenciaComponent;
  let fixture: ComponentFixture<NuevaIncidenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaIncidenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
