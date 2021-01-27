
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.scss']
})
export class NuevoAlumnoComponent implements OnInit {
  nuevoAlumno: FormGroup;
  submitted = false;
  curso: any;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router,private adminAlumnosService: AdminAlumnosService,private loginService: LoginService) {
    if (!loginService.isUserSignedIn()){
      this.router.navigate(['/login']);
    }
    this.curso = {
      'id': this.route.snapshot.paramMap.get('id'),
      'tutor': this.route.snapshot.paramMap.get('tutor'),
      'familiaProfesional': this.route.snapshot.paramMap.get('familiaProfesional'),
      'cicloFormativo':  this.route.snapshot.paramMap.get('cicloFormativo'),
      'cicloFormativoA':  this.route.snapshot.paramMap.get('cicloFormativoA'),
      'cursoAcademico': this.route.snapshot.paramMap.get('cursoAcademico'),
      'nHoras': this.route.snapshot.paramMap.get('nHoras')
    };

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

  onSubmit() {
    this.submitted = true;
    if (this.nuevoAlumno.invalid) {
      return;
    }
    //console.log(this.nuevoAlumno.value);
    this.adminAlumnosService.insertAlumnoSuscription(this.nuevoAlumno.value, this.curso);
    this.onReset();
  }
  onReset() {
    this.submitted = false;
    this.nuevoAlumno.reset();
  }

}




