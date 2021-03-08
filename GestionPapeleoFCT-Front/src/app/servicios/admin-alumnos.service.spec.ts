import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminAlumnosService } from './admin-alumnos.service';

describe('AdminAlumnosService', () => {
  let service: AdminAlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
    });
    service = TestBed.inject(AdminAlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
