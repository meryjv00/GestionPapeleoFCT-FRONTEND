import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFotoAlumnoComponent } from './modal-foto-alumno.component';

describe('ModalFotoAlumnoComponent', () => {
  let component: ModalFotoAlumnoComponent;
  let fixture: ComponentFixture<ModalFotoAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFotoAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFotoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
