import { TestBed } from '@angular/core/testing';

import { RegistroPersonaService } from './registro-persona.service';

describe('RegistroPersonaService', () => {
  let service: RegistroPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
