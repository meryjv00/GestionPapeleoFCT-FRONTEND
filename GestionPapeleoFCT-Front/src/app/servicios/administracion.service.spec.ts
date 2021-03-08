import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";
import { AdministracionService } from './administracion.service';

describe('AdministracionService', () => {
  let service: AdministracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
    });
    service = TestBed.inject(AdministracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
