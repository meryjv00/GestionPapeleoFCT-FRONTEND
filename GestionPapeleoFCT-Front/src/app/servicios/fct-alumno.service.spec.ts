import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../componentes/login/login.component';

import { FctAlumnoService } from './fct-alumno.service';

describe('FctAlumnoService', () => {
  let service: FctAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent}
        ])
      ],
    });
    service = TestBed.inject(FctAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
