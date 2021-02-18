import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddAlumnoCursoComponent } from './modal-add-alumno-practica.component';

describe('ModalAddAlumnoCursoComponent', () => {
  let component: ModalAddAlumnoCursoComponent;
  let fixture: ComponentFixture<ModalAddAlumnoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddAlumnoCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddAlumnoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
