import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";
import { FormBuilder } from '@angular/forms';

import { AdministracionComponent } from './administracion.component';
import { LoginComponent } from '../login/login.component';

describe('AdministracionComponent', () => {
  let component: AdministracionComponent;
  let fixture: ComponentFixture<AdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent}
        ])
      ],
      providers: [ 
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
