import { Component, OnInit } from '@angular/core';
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
  constructor(private route: ActivatedRoute,private listaAlumnosService: ListaAlumnosService,private router: Router,private loginService: LoginService) {
    if (!loginService.isUserSignedIn()){
      this.router.navigate(['/login']);
    }
    this.alumnos = [];
    this.curso = {
      'id': this.route.snapshot.paramMap.get('id'),
      'tutor': this.route.snapshot.paramMap.get('tutor'),
      'familiaProfesional': this.route.snapshot.paramMap.get('familiaProfesional'),
      'cicloFormativo':  this.route.snapshot.paramMap.get('cicloFormativo'),
      'cicloFormativoA':  this.route.snapshot.paramMap.get('cicloFormativoA'),
      'cursoAcademico': this.route.snapshot.paramMap.get('cursoAcademico'),
      'nHoras': this.route.snapshot.paramMap.get('nHoras')
    };
  }

  ngOnInit(): void {
    this.getAlumnos();
  }

  //Cargar alumnos con el id del curso
  getAlumnos() {
    this.listaAlumnosService.getAlumnos(this.curso.id).subscribe(
      (response: any) => {
        const datos = response.message;
        datos.forEach((element: { alumnos: any}) => {
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