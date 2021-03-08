import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminEmpresasService } from './admin-empresas.service';

describe('AdminEmpresasService', () => {
  let service: AdminEmpresasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
    });
    service = TestBed.inject(AdminEmpresasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
