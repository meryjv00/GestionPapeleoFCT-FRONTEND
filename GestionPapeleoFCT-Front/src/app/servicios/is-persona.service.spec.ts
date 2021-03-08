import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IsPersonaService } from './is-persona.service';

describe('IsPersonaService', () => {
  let service: IsPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
    });
    service = TestBed.inject(IsPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
