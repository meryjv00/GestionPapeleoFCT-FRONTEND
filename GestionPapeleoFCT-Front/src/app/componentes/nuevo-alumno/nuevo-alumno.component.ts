
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  @Input() public cursoSeleccionado: any;
  @Input() public alumnos: any;
  nuevoAlumno: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private adminAlumnosService: AdminAlumnosService, private loginService: LoginService,
    private CompartirDatos: CompartirDatosService, private modal: NgbModal, public activeModal: NgbActiveModal) {
    if (!loginService.isUserSignedIn()) {
      this.router.navigate(['/login']);
    }
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
    console.log('seleccionado');
    console.log(this.cursoSeleccionado);
    
    
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

    //Añade el alumno
    this.adminAlumnosService.insertAlumno(this.nuevoAlumno.value, this.cursoSeleccionado).subscribe(
      (response: any) => {
        // Añade el nuevo alumno al array local
        this.alumnos.push(response.alumno);
        
        this.activeModal.close();
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = this.nuevoAlumno.value.nombre + ' ' + this.nuevoAlumno.value.apellidos +
          ' añadido a correctamente al curso ' + this.cursoSeleccionado.cicloFormativoA;
        modalRef.componentInstance.exito = true;
      },
      (error) => {
        console.log(error);
        this.activeModal.close();
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un error al añadir a ' + this.nuevoAlumno.value.nombre +
          ' ' + this.nuevoAlumno.value.apellidos + ' a el curso ' + this.cursoSeleccionado.cicloFormativoA;
        modalRef.componentInstance.exito = false;
      }
    );
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
    this.activeModal.close();
  }
}




