import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmpresasComponent } from './lista-empresas.component';
import { AdminEmpresasService } from "src/app/servicios/admin-empresas.service";
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { AnexosService } from 'src/app/servicios/anexos.service';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";


describe('ListaEmpresasComponent', () => {
  let component: ListaEmpresasComponent;
  let fixture: ComponentFixture<ListaEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEmpresasComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [ 
        AnexosService,
        AdminEmpresasService, 
        CompartirDatosService
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
