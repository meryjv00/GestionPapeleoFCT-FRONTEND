import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualizarCursoComponent } from './actualizar-curso.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';
import { LoginService } from 'src/app/servicios/login.service';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ActualizarCursoComponent', () => {
  let component: ActualizarCursoComponent;
  let fixture: ComponentFixture<ActualizarCursoComponent>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [ 
        ListaCursosService,
        CompartirDatosService, 
        CursosService,
        LoginService,
        FormBuilder,
        NgbActiveModal
      ],
      declarations: [ ActualizarCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
