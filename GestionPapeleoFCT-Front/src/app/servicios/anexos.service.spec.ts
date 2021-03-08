import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";
import { AnexosService } from './anexos.service';
import { LoginComponent } from '../componentes/login/login.component';

describe('AnexosService', () => {
  let service: AnexosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent}
        ])
      ],
    });
    service = TestBed.inject(AnexosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
