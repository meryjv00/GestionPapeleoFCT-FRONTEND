import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';

import { RecPassComponent } from './rec-pass.component';

describe('RecPassComponent', () => {
  let component: RecPassComponent;
  let fixture: ComponentFixture<RecPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecPassComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent}
        ])
      ],
      providers: [ 
        FormBuilder
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
