import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocLuisComponent } from './doc-luis.component';

describe('DocLuisComponent', () => {
  let component: DocLuisComponent;
  let fixture: ComponentFixture<DocLuisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocLuisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocLuisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
