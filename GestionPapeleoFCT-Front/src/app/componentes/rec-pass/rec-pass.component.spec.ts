import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecPassComponent } from './rec-pass.component';

describe('RecPassComponent', () => {
  let component: RecPassComponent;
  let fixture: ComponentFixture<RecPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecPassComponent ]
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
