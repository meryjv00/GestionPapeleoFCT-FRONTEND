import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { NuevaEmpresaComponent } from './nueva-empresa.component';

describe('NuevaEmpresaComponent', () => {
  let component: NuevaEmpresaComponent;
  let fixture: ComponentFixture<NuevaEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaEmpresaComponent ],
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
    fixture = TestBed.createComponent(NuevaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
