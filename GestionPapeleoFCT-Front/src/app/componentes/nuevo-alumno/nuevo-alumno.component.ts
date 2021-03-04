
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';

@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.scss']
})
export class NuevoAlumnoComponent implements OnInit {
  nuevoAlumno: FormGroup;
  curso: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private adminAlumnosService: AdminAlumnosService, private loginService: LoginService,
    private CompartirDatos: CompartirDatosService, private modal: NgbModal) {
    if (!loginService.isUserSignedIn()) {
      this.router.navigate(['/login']);
    }
    //Obtiene los datos del curso seleccionado
    this.curso = this.CompartirDatos.getCurso();
    //Formulario nuevo alumno
    this.nuevoAlumno = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern]],
      nombre: ['', [Validators.required, Validators.pattern]],
      apellidos: ['', [Validators.required, Validators.pattern]],
      localidad: ['', [Validators.required, Validators.minLength]],
      residencia: ['', [Validators.required, Validators.minLength]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern]]
    });
  }

  ngOnInit(): void {
  }

  get formulario() { return this.nuevoAlumno.controls; }

  /**
   * Añadimos nuevo alumno al curso seleccionado
   */
  onSubmit() {
    this.submitted = true;
    if (this.nuevoAlumno.invalid) {
      return;
    }

    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres añadir este alumno a el curso ' + this.curso.cicloFormativoA + ' ?';
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      //Añade el alumno
      this.adminAlumnosService.insertAlumno(this.nuevoAlumno.value, this.curso).subscribe(
        (response: any) => {
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = this.nuevoAlumno.value.nombre + ' ' + this.nuevoAlumno.value.apellidos +
            ' añadido a correctamente al curso ' + this.curso.cicloFormativoA;
          modalRef.componentInstance.exito = true;
          this.router.navigate(['/listaCursos', { id: JSON.stringify(this.curso.id) }]);
        },
        (error) => {
          console.log(error);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Ha ocurrido un error al añadir a ' + this.nuevoAlumno.value.nombre +
          ' ' + this.nuevoAlumno.value.apellidos + ' a el curso ' + this.curso.cicloFormativoA;
          modalRef.componentInstance.exito = false;
        }
      );
    });
  }

  /**
   * Cancelamos el envio, vaciamos los campos
   */
  onReset() {
    this.submitted = false;
    this.nuevoAlumno.reset();
  }

  /**
   * Vuelve a la lista de cursos cargando el curso seleccionado
   */
  cancelar() {
    this.router.navigate(['/listaCursos', { id: JSON.stringify(this.curso.id) }]);
  }
}




