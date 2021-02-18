
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.scss']
})
export class NuevoAlumnoComponent implements OnInit {
  nuevoAlumno: FormGroup;
  curso: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private router: Router,private adminAlumnosService: AdminAlumnosService,private loginService: LoginService,private CompartirDatos: CompartirDatosService) {
    if (!loginService.isUserSignedIn()){
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
    let add = confirm("¿Estás seguro de que quieres añadir este alumno a el curso " +  this.curso.cicloFormativoA + "?");
    if (add) {
      this.insertAlumno();
      this.onReset();
    }
  }

  insertAlumno(){
    this.adminAlumnosService.insertAlumno(this.nuevoAlumno.value, this.curso).subscribe(
      (response: any) => {
        this.router.navigate(['/listaCursos']);
      },
      (error) => {
        console.log(error);
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

}




