import { TestBed } from '@angular/core/testing';

import { EnvEmailService } from './env-email.service';

describe('EnvEmailService', () => {
  let service: EnvEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
