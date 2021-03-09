import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";
import { ResponsablesEmpresaService } from './responsables-empresa.service';
import { LoginComponent } from '../componentes/login/login.component';

describe('ResponsablesEmpresaService', () => {
  let service: ResponsablesEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent}
        ])
      ],
    });
    service = TestBed.inject(ResponsablesEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
