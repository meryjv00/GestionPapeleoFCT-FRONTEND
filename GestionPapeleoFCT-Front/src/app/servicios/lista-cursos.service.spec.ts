import { TestBed } from '@angular/core/testing';

import { ListaCursosService } from './lista-cursos.service';

describe('ListaCursosService', () => {
  let service: ListaCursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaCursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
