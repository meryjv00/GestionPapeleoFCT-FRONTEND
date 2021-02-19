import { TestBed } from '@angular/core/testing';

import { FctAlumnoService } from './fct-alumno.service';

describe('FctAlumnoService', () => {
  let service: FctAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FctAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
