import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModobjetivoComponent } from './modobjetivo.component';

describe('ModobjetivoComponent', () => {
  let component: ModobjetivoComponent;
  let fixture: ComponentFixture<ModobjetivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModobjetivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModobjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
