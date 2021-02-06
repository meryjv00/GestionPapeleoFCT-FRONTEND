import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUserComponent } from './registro-user.component';

describe('RegistroUserComponent', () => {
  let component: RegistroUserComponent;
  let fixture: ComponentFixture<RegistroUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
