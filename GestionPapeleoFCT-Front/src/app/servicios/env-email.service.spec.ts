import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../componentes/login/login.component';

import { EnvEmailService } from './env-email.service';

describe('EnvEmailService', () => {
  let service: EnvEmailService;

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
    service = TestBed.inject(EnvEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
