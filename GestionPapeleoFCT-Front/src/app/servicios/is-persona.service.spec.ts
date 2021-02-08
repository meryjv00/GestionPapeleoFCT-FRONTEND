import { TestBed } from '@angular/core/testing';

import { IsPersonaService } from './is-persona.service';

describe('IsPersonaService', () => {
  let service: IsPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
