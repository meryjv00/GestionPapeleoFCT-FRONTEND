import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../componentes/login/login.component';

import { ListaCursosService } from './lista-cursos.service';

describe('ListaCursosService', () => {
  let service: ListaCursosService;

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
    service = TestBed.inject(ListaCursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
