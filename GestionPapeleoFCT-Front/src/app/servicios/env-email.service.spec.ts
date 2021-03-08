import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EnvEmailService } from './env-email.service';

describe('EnvEmailService', () => {
  let service: EnvEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
    });
    service = TestBed.inject(EnvEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
