import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";
import { AnexosService } from './anexos.service';

describe('AnexosService', () => {
  let service: AnexosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
    });
    service = TestBed.inject(AnexosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
