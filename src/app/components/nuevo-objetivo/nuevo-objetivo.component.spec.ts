import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoObjetivoComponent } from './nuevo-objetivo.component';

describe('NuevoObjetivoComponent', () => {
  let component: NuevoObjetivoComponent;
  let fixture: ComponentFixture<NuevoObjetivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoObjetivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoObjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
