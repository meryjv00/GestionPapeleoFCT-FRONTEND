import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../componentes/login/login.component';
import { AdminAlumnosService } from './admin-alumnos.service';

describe('AdminAlumnosService', () => {
  let service: AdminAlumnosService;

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
    service = TestBed.inject(AdminAlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
