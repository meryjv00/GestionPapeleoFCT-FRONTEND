import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';
import { LoginService } from 'src/app/servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {
  @Input() public alumno: any;
  @Input() public alumnos: any;
  @Input() public cursoSeleccionado: any;
  modificarAlumno: FormGroup;
  submitted = false;
  activados = false;
  textoBoton: any;
  alumnoU: any;

  constructor(private router: Router, private loginService: LoginService, private adminAlumnosService: AdminAlumnosService, private formBuilder: FormBuilder,
    private CompartirDatos: CompartirDatosService, private modal: NgbModal, public activeModal: NgbActiveModal) {
    if (!loginService.isUserSignedIn()) {
      this.router.navigate(['/login']);
    }

    this.modificarAlumno = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern]],
      nombre: ['', [Validators.required, Validators.pattern]],
      apellidos: ['', [Validators.required, Validators.pattern]],
      localidad: ['', [Validators.required, Validators.minLength]],
      residencia: ['', [Validators.required, Validators.minLength]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern]]
    });
    this.modificarAlumno?.disable();
    this.textoBoton = "Editar";
  }

  ngOnInit(): void {
    this.alumnoU = { ...this.alumno };    
  }

  get formulario() { return this.modificarAlumno.controls; }

  /**
   * Editar alumno
   */
  updateAlumno() {
    this.submitted = true;
    if (this.modificarAlumno.invalid) {
      return;
    }
    this.activeModal.close();
    
    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres actualizar los datos de este alumno?';
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.adminAlumnosService.updateAlumno(this.alumnoU).subscribe(
        (response: any) => {
          console.log(response);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = this.alumno.nombre + ' ' + this.alumno.apellidos + ' actualizado correctamente';
          modalRef.componentInstance.exito = true;
          // Actualizo los datos del alumnos en local
          this.alumnos.forEach((alum: any, index: any) => {
            if (alum.id == this.alumnoU.id) {              
              alum.nombre = this.alumnoU.nombre;
              alum.apellidos = this.alumnoU.apellidos;
              alum.correo = this.alumnoU.correo;
              alum.residencia = this.alumnoU.residencia;
              alum.localidad = this.alumnoU.localidad;
              alum.dni = this.alumnoU.dni;
              alum.telefono = this.alumnoU.telefono;
            }
          });
        },
        (error) => {
          console.log(error);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Ha ocurrido un error al actualizar el alumno';
          modalRef.componentInstance.exito = false;
        }
      );
    });

  }

  /**
   * Eliminar alumno
   */
  deleteAlumno() {
    this.activeModal.close();
    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres eliminar a ' + this.alumno.nombre + ' ' + this.alumno.apellidos + ' de la base de datos?';
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.adminAlumnosService.deleteAlumno(this.alumno).subscribe(
        (response: any) => {
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = this.alumno.nombre + ' ' + this.alumno.apellidos + ' eliminado correctamente';
          modalRef.componentInstance.exito = true;
          this.router.navigate(['/listaCursos', { id: JSON.stringify(this.cursoSeleccionado.id) }]);
          // Borro el alumno del array local
          this.alumnos.forEach((alum: any, index: any) => {
            if (alum.id == this.alumno.id) {
              this.alumnos.splice(index, 1);
            }
          });
        },
        (error) => {
          console.log(error);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Ha ocurrido un error al eliminar el alumno';
          modalRef.componentInstance.exito = false;
        }
      );
    });
  }

  /**
   * Activa los inputs del formulario para editarlos o en caso de que esten 
   * activados los desactiva
   */
  activarEdicion() {
    if (!this.activados) {
      this.modificarAlumno?.enable();
      this.activados = true;
      this.textoBoton = "Cancelar";
    } else {
      this.modificarAlumno?.disable();
      this.activados = false;
      this.textoBoton = "Editar";
    }
  }

  /**
   * Vuelve al curso del alumno
   */
  volver() {
    this.activeModal.close();
  }
}
