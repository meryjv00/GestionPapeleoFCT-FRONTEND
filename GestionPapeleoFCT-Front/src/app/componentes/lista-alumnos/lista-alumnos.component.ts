import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaAlumnosService } from 'src/app/servicios/lista-alumnos.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})


export class ListaAlumnosComponent implements OnInit {
  alumnos: any[];
  curso: any;
  @Input() cursoSeleccionado: any;
  constructor(private listaAlumnosService: ListaAlumnosService, private router: Router, private loginService: LoginService) {
    if (!loginService.isUserSignedIn()) {
      this.router.navigate(['/login']);
    }
    this.alumnos = [];
  }

  ngOnInit(): void {
    this.curso = {
      'id': this.cursoSeleccionado.id,
      'tutor': this.cursoSeleccionado.tutor,
      'familiaProfesional': this.cursoSeleccionado.familiaProfesional,
      'cicloFormativo':  this.cursoSeleccionado.cicloFormativo,
      'cicloFormativoA':  this.cursoSeleccionado.cicloFormativoA,
      'cursoAcademico': this.cursoSeleccionado.cursoAcademico,
      'nHoras': this.cursoSeleccionado.nHoras
    };
    this.getAlumnos();
  }

  //Cargar alumnos con el id del curso
  getAlumnos() {
    this.listaAlumnosService.getAlumnos(this.curso.id).subscribe(
      (response: any) => {
        const datos = response.message;
        datos.forEach((element: { alumnos: any }) => {
          let alumn0 = element.alumnos[0];
          let alumno = {
            'id': alumn0.id,
            'dni': alumn0.dni,
            'nombre': alumn0.nombre,
            'apellidos': alumn0.apellidos,
            'localidad': alumn0.localidad,
            'residencia': alumn0.residencia,
            'correo': alumn0.correo,
            'telefono': alumn0.tlf
          };
          this.alumnos.push(alumno);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}