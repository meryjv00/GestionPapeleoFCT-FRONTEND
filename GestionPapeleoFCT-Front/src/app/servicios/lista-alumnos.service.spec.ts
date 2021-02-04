import { TestBed } from '@angular/core/testing';

import { ListaAlumnosService } from './lista-alumnos.service';

describe('ListaAlumnosService', () => {
  let service: ListaAlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaAlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
