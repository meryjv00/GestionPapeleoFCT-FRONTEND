import { TestBed } from '@angular/core/testing';

import { ResponsablesEmpresaService } from './responsables-empresa.service';

describe('ResponsablesEmpresaService', () => {
  let service: ResponsablesEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsablesEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
