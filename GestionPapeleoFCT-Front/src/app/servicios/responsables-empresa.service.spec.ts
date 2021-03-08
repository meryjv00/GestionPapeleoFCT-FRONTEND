import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";
import { ResponsablesEmpresaService } from './responsables-empresa.service';

describe('ResponsablesEmpresaService', () => {
  let service: ResponsablesEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
    });
    service = TestBed.inject(ResponsablesEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
