import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { NuevoCursoComponent } from './nuevo-curso.component';

describe('NuevoCursoComponent', () => {
  let component: NuevoCursoComponent;
  let fixture: ComponentFixture<NuevoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoCursoComponent ],
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
    fixture = TestBed.createComponent(NuevoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
