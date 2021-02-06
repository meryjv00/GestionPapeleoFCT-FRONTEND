import { TestBed } from '@angular/core/testing';

import { AdminEmpresasService } from './admin-empresas.service';

describe('AdminEmpresasService', () => {
  let service: AdminEmpresasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEmpresasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
