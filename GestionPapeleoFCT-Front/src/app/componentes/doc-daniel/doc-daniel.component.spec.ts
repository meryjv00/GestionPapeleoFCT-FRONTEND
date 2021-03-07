import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDanielComponent } from './doc-daniel.component';

describe('DocDanielComponent', () => {
  let component: DocDanielComponent;
  let fixture: ComponentFixture<DocDanielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocDanielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocDanielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
