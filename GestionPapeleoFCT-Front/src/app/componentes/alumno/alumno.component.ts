import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';
import { LoginService } from 'src/app/servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {
  alumno: any;
  curso: any;
  modificarAlumno: FormGroup;
  submitted = false;
  activados = false;
  textoBoton: any;

  constructor(private router: Router, private loginService: LoginService, private adminAlumnosService: AdminAlumnosService, private formBuilder: FormBuilder,
    private CompartirDatos: CompartirDatosService, private modal: NgbModal) {
    if (!loginService.isUserSignedIn()) {
      this.router.navigate(['/login']);
    }
    //Obtiene los datos del alumno seleccionado
    this.alumno = this.CompartirDatos.getAlumno();
    //Obtiene el curso del alumno
    this.curso = this.CompartirDatos.getCurso();

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

    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres actualizar los datos de este alumno?';
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.adminAlumnosService.updateAlumno(this.alumno).subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/alumno', this.alumno]);
        },
        (error) => {
          console.log(error);
        }
      );
    });

  }

  /**
   * Eliminar alumno
   */
  deleteAlumno() {
    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres eliminar este alumno de la base de datos?';
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.adminAlumnosService.deleteAlumno(this.alumno).subscribe(
        (response: any) => {
          this.router.navigate(['/listaCursos', {id:JSON.stringify(this.curso.id)}]);
        },
        (error) => {
          console.log(error);
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
  volver(){
    this.router.navigate(['/listaCursos', {id:JSON.stringify(this.curso.id)}]);
  }
}
