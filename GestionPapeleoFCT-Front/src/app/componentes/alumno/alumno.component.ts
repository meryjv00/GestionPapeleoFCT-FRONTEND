import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';
import { LoginService } from 'src/app/servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {
  alumno: any;
  modificarAlumno: FormGroup;
  submitted = false;
  
  constructor(private router: Router, private loginService: LoginService, private adminAlumnosService: AdminAlumnosService, private formBuilder: FormBuilder,private CompartirDatos: CompartirDatosService) {
    if (!loginService.isUserSignedIn()) {
      this.router.navigate(['/login']);
    }
    //Obtiene los datos del alumno seleccionado
    this.alumno = this.CompartirDatos.getAlumno();

    this.modificarAlumno = this.formBuilder.group({
      localidad: ['', [Validators.required,Validators.minLength]],
      residencia: ['', [Validators.required,Validators.minLength]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern]]
    });
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
    this.updateAlumn0();
  }
  
  updateAlumn0(){
    this.adminAlumnosService.updateAlumno(this.alumno).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/alumno',this.alumno]);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  /**
   * Eliminar alumno
   */
  deleteAlumno() {
    this.adminAlumnosService.deleteAlumno(this.alumno).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/listaCursos']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
