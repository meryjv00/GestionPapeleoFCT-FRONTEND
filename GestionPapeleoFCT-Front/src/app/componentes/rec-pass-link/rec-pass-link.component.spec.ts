import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecPassLinkComponent } from './rec-pass-link.component';

describe('RecPassLinkComponent', () => {
  let component: RecPassLinkComponent;
  let fixture: ComponentFixture<RecPassLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecPassLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecPassLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
