import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";
import { ModUsLogService } from './mod-us-log.service';
import { LoginComponent } from '../componentes/login/login.component';

describe('ModUsLogService', () => {
  let service: ModUsLogService;

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
    service = TestBed.inject(ModUsLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
