import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';
import { LoginService } from 'src/app/servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {
  alumno: any;
  modificarAlumno: FormGroup;
  submitted = false;
  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService, private adminAlumnosService: AdminAlumnosService,
    private formBuilder: FormBuilder) {
    if (!loginService.isUserSignedIn()) {
      this.router.navigate(['/login']);
    }
    this.alumno = {
      'id': this.route.snapshot.paramMap.get('id'),
      'dni': this.route.snapshot.paramMap.get('dni'),
      'nombre': this.route.snapshot.paramMap.get('nombre'),
      'apellidos': this.route.snapshot.paramMap.get('apellidos'),
      'localidad': this.route.snapshot.paramMap.get('localidad'),
      'residencia': this.route.snapshot.paramMap.get('residencia'),
      'correo': this.route.snapshot.paramMap.get('correo'),
      'telefono': this.route.snapshot.paramMap.get('telefono')
    }

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

  //Editar alumno
  updateAlumno() {
    this.submitted = true;
    if (this.modificarAlumno.invalid) {
      return;
    }
    //Modificar datos del alumno
    this.adminAlumnosService.updateAlumnoSuscription(this.alumno);
  }
  //Eliminar alumno
  deleteAlumno() {
    this.adminAlumnosService.deleteAlumnoSuscription(this.alumno);
  }
}
