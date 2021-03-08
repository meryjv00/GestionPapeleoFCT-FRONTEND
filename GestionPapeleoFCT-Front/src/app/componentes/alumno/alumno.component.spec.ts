import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { AlumnoComponent } from './alumno.component';
import { FormBuilder } from '@angular/forms';
import { LoginComponent } from '../login/login.component';

describe('AlumnoComponent', () => {
  let component: AlumnoComponent;
  let fixture: ComponentFixture<AlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent}
        ])
      ],
      providers: [ 
        FormBuilder,
      ],
      declarations: [ AlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
