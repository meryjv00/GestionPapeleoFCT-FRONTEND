import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';
import { environment } from 'src/environments/environment';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';

@Component({
  selector: 'app-modal-foto-alumno',
  templateUrl: './modal-foto-alumno.component.html',
  styleUrls: ['./modal-foto-alumno.component.scss']
})
export class ModalFotoAlumnoComponent implements OnInit {
  @Output() storeOk: EventEmitter<any> = new EventEmitter();
  @Input() public alumno: any;
  fotoPerfil: FormGroup;
  foto: any;
  submittedFoto = false;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private AdminAlumnosService: AdminAlumnosService,
    private router: Router, private modal: NgbModal) {
    this.fotoPerfil = this.formBuilder.group({
      fotoPerfil: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get formularioFoto() { return this.fotoPerfil.controls; }

  /**
 * Se guarda la foto
 * @param event 
 */
  guardarFoto(event: any) {
    this.foto = <File>event.target.files[0];
  }

  onSubmitFoto() {
    this.submittedFoto = true;
    if (this.fotoPerfil.invalid) {
      return;
    }
    this.AdminAlumnosService.cambiarFoto(this.foto, this.alumno.dni).subscribe(
      (response: any) => {
        if (response.message.foto == 1) {
          this.alumno.foto = environment.dirBack2 + "IMG/" + this.alumno.dni + ".png";

          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = `Foto de ${this.alumno.nombre}  ${this.alumno.apellidos} actualizada correctamente`;
          modalRef.componentInstance.exito = true;
        }
      },
      (error) => {
        console.log(error);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un error al actualizar la foto';
        modalRef.componentInstance.exito = false;
      }
    );

    //this.activeModal.close();
    //this.storeOk.emit(true);
  }


  //Cancelar
  cancelar() {
    this.activeModal.close();
  }
}
