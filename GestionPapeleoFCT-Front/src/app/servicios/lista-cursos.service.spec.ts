import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ListaCursosService } from './lista-cursos.service';

describe('ListaCursosService', () => {
  let service: ListaCursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
    });
    service = TestBed.inject(ListaCursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
