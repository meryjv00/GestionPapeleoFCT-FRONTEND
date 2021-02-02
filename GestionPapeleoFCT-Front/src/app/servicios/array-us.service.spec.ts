import { TestBed } from '@angular/core/testing';

import { ArrayUsService } from './array-us.service';

describe('ArrayUsService', () => {
  let service: ArrayUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
