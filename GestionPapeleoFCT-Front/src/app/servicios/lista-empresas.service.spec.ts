import { TestBed } from '@angular/core/testing';

import { ListaEmpresasService } from './lista-empresas.service';

describe('ListaEmpresasService', () => {
  let service: ListaEmpresasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaEmpresasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
