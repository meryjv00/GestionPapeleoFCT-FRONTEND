import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionAnioComponent } from './administracion-anio.component';

describe('AdministracionAnioComponent', () => {
  let component: AdministracionAnioComponent;
  let fixture: ComponentFixture<AdministracionAnioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministracionAnioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionAnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
