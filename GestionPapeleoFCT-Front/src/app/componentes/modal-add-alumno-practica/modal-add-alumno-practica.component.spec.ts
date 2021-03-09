import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { ModalAddAlumnoPracticaComponent } from './modal-add-alumno-practica.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { LoginComponent } from '../login/login.component';

describe('ModalAddAlumnoPracticaComponent', () => {
  let component: ModalAddAlumnoPracticaComponent;
  let fixture: ComponentFixture<ModalAddAlumnoPracticaComponent>;

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
