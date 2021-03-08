import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from "@angular/router/testing";
import { InfCentroComponent } from './inf-centro.component';
import { FormBuilder } from '@angular/forms';

describe('InfCentroComponent', () => {
  let component: InfCentroComponent;
  let fixture: ComponentFixture<InfCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfCentroComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
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
