import { TestBed } from '@angular/core/testing';

import { AdminAlumnosService } from './admin-alumnos.service';

describe('AdminAlumnosService', () => {
  let service: AdminAlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
