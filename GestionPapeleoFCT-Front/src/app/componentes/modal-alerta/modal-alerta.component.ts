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
  @Input() public exito: any;
  showConfirmar = true;
  showExito = false;
  showError = false;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.exito);

    // Evaluamos si vamos a la pregunta de confirmacion o al exito o fracaso de la acción

    if (this.exito) {
      console.log('entro true');
      
      this.showConfirmar = false;
      this.showExito = true;
      setTimeout(() => {
        this.activeModal.close();
      }, 1700);
    } else if (this.exito == false) {
      console.log('entro false');
      
      this.showConfirmar = false;
      this.showError = true;
      setTimeout(() => {
        this.activeModal.close();
      }, 1700);
    }

  }

  //Confirmar
  confirmar() {
    this.activeModal.close();
    this.storeOk.emit(true);
  }

  //Cancelar
  cancelar() {
    this.activeModal.close();
  }

}
