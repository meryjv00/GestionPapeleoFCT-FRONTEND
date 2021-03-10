import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../componentes/login/login.component';

import { RecPassContolService } from './rec-pass-contol.service';

describe('RecPassContolService', () => {
  let service: RecPassContolService;

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
    service = TestBed.inject(RecPassContolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
