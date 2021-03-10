import { TestBed } from '@angular/core/testing';

import { RecPassContolService } from './rec-pass-contol.service';

describe('RecPassContolService', () => {
  let service: RecPassContolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecPassContolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
