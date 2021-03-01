import { TestBed } from '@angular/core/testing';

import { ModUsLogService } from './mod-us-log.service';

describe('ModUsLogService', () => {
  let service: ModUsLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModUsLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
