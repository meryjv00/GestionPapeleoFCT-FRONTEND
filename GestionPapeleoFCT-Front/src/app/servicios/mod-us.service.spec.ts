import { TestBed } from '@angular/core/testing';

import { ModUsService } from './mod-us.service';

describe('ModUsService', () => {
  let service: ModUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
