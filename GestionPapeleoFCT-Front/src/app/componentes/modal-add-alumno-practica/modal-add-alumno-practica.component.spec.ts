import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddAlumnoPracticaComponent } from './modal-add-alumno-practica.component';

describe('ModalAddAlumnoPracticaComponent', () => {
  let component: ModalAddAlumnoPracticaComponent;
  let fixture: ComponentFixture<ModalAddAlumnoPracticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddAlumnoPracticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddAlumnoPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
