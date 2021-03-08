import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ModUsService } from './mod-us.service';

describe('ModUsService', () => {
  let service: ModUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
    });
    service = TestBed.inject(ModUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
