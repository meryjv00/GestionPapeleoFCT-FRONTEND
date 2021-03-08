import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../componentes/login/login.component';

import { AdminCentroService } from './admin-centro.service';

describe('AdminCentroService', () => {
  let service: AdminCentroService;

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
    service = TestBed.inject(AdminCentroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
