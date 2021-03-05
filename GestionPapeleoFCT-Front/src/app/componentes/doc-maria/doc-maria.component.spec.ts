import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocMariaComponent } from './doc-maria.component';

describe('DocMariaComponent', () => {
  let component: DocMariaComponent;
  let fixture: ComponentFixture<DocMariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocMariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocMariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
