import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { RegistroPersonaComponent } from './registro-persona.component';

describe('RegistroPersonaComponent', () => {
  let component: RegistroPersonaComponent;
  let fixture: ComponentFixture<RegistroPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPersonaComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [ 
        FormBuilder
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
