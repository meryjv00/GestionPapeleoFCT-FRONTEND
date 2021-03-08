import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FctAlumnoService } from './fct-alumno.service';

describe('FctAlumnoService', () => {
  let service: FctAlumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
    });
    service = TestBed.inject(FctAlumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
