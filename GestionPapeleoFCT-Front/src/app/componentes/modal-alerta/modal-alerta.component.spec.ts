import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlertaComponent } from './modal-alerta.component';

describe('ModalAlertaComponent', () => {
  let component: ModalAlertaComponent;
  let fixture: ComponentFixture<ModalAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAlertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
