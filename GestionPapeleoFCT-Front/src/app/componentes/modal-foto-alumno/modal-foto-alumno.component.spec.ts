import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";

import { ModalFotoAlumnoComponent } from './modal-foto-alumno.component';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder } from '@angular/forms';
import { LoginComponent } from '../login/login.component';

describe('ModalFotoAlumnoComponent', () => {
  let component: ModalFotoAlumnoComponent;
  let fixture: ComponentFixture<ModalFotoAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent}
        ])
      ],
      providers: [ 
        NgbActiveModal,
        FormBuilder
      ],
      declarations: [ ModalFotoAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFotoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
