import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})

export class AdministracionComponent implements OnInit {
  submittedProfesores = false;
  submittedAlumnos = false;
  profesoresCSV: FormGroup;
  alumnosCSV: FormGroup;

  haCambiado = false;
  cursos: any[];
  cursoSeleccionado: any;

  constructor(private listaCursosService: ListaCursosService, private formBuilder: FormBuilder, private administracionService: AdministracionService, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn()) {
      this.router.navigate(['/login']);
    }

    this.profesoresCSV = this.formBuilder.group({
      profesoresCSV: ['', [Validators.required]]
    });
    this.alumnosCSV = this.formBuilder.group({
      alumnosCSV: ['', [Validators.required]]
    });
    this.cursos = [];
  }

  ngOnInit(): void {
    this.getCursos();
  }

  get formularioProfesores() { return this.profesoresCSV.controls; }
  get formularioAlumnos() { return this.alumnosCSV.controls; }

  onSubmitProfesores() {
    this.submittedProfesores = true;
    if (this.profesoresCSV.invalid) {
      return;
    }
    this.administracionService.insertProfesores().subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.log(error);
      }
    );
    alert("Profesores añadidos correctamente");
    this.router.navigate(['/admin']);
  }

  onSubmitAlumnos() {
    this.submittedAlumnos = true;
    if (this.alumnosCSV.invalid) {
      return;
    }
    this.administracionService.insertAlumnos(this.cursoSeleccionado).subscribe(
      (response: any) => {
        //console.log(response);
        this.cursos.forEach((curso, index) => {
          if (curso.id == this.cursoSeleccionado.id) {
            //console.log(curso.id);
            this.cursos.splice(index, 1);
          }
        });

        this.onChange(this.cursos[0].id);
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.log(error);
      }
    );
    alert("Alumnos del curso " + this.cursoSeleccionado.cicloFormativoA + " insertados");
    this.router.navigate(['/admin']);
  }

  getCursos() {
    this.listaCursosService.getCursos().subscribe(
      (response: any) => {
        let cursos = response.message;
        cursos.forEach((element: {
          id: any; dniTutor: any; familiaProfesional: any; cicloFormativo: any; cicloFormativoA: any;
          cursoAcademico: any; nHoras: any; cursos: any;
        }) => {
          let curso = {
            'id': element.id,
            'tutor': element.cursos.nombre + ' ' + element.cursos.apellidos,
            'familiaProfesional': element.familiaProfesional,
            'cicloFormativo': element.cicloFormativo,
            'cicloFormativoA': element.cicloFormativoA,
            'cursoAcademico': element.cursoAcademico,
            'nHoras': element.nHoras
          };
          this.cursos.push(curso);
        });
        this.onChange(this.cursos[0].id);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  onChange(value: any) {
    this.haCambiado = true;
    this.cursos.forEach((curso: { id: any; }) => {
      if (value == curso.id) {
        this.cursoSeleccionado = curso;
      }
    });
    //console.log(this.cursoSeleccionado);
  }
}
