import { TestBed } from '@angular/core/testing';

import { AdminCentroService } from './admin-centro.service';

describe('AdminCentroService', () => {
  let service: AdminCentroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCentroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
