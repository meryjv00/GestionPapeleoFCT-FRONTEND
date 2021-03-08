import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";
import { InfCentroComponent } from './inf-centro.component';
import { FormBuilder } from '@angular/forms';
import { LoginComponent } from '../login/login.component';

describe('InfCentroComponent', () => {
  let component: InfCentroComponent;
  let fixture: ComponentFixture<InfCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfCentroComponent ],
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
    fixture = TestBed.createComponent(InfCentroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
