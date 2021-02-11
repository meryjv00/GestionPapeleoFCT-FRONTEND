import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfCentroComponent } from './inf-centro.component';

describe('InfCentroComponent', () => {
  let component: InfCentroComponent;
  let fixture: ComponentFixture<InfCentroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfCentroComponent ]
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
