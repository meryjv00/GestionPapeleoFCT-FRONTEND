import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-alerta',
  templateUrl: './modal-alerta.component.html',
  styleUrls: ['./modal-alerta.component.scss']
})
export class ModalAlertaComponent implements OnInit {

  @Output() storeOk: EventEmitter<any> = new EventEmitter();
  @Input() public mensaje: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  //Confirmar
  confirmar(){
    this.activeModal.close();
    this.storeOk.emit(true);
  }

  //Cancelar
  cancelar(){
    this.activeModal.close();
  }

}
