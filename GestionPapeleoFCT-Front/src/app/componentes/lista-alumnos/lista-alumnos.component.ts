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
  id: any; tutor: any; familiaProfesional: any; cicloFormativo: any; cicloFormativoA: any; cursoAcademico: any; nHoras: any;
  alumnos: any[];

  //
  constructor(private route: ActivatedRoute,private listaAlumnosService: ListaAlumnosService,private router: Router,private loginService: LoginService) {
    if (!loginService.isUserSignedIn()){
      this.router.navigate(['/login']);
    }
    
    this.alumnos = [];
    this.id = this.route.snapshot.paramMap.get('id');
    this.tutor = this.route.snapshot.paramMap.get('tutor');
    this.familiaProfesional = this.route.snapshot.paramMap.get('familiaProfesional');
    this.cicloFormativo = this.route.snapshot.paramMap.get('cicloFormativo');
    this.cicloFormativoA = this.route.snapshot.paramMap.get('cicloFormativoA');
    this.cursoAcademico = this.route.snapshot.paramMap.get('cursoAcademico');
    this.nHoras = this.route.snapshot.paramMap.get('nHoras');
  }

  ngOnInit(): void {
    this.getAlumnos();
  }

  //Cargar alumnos con el id del curso
  getAlumnos() {
    this.listaAlumnosService.getAlumnos(this.id).subscribe(
      (response: any) => {
        //console.log(response.message);
        const datos = response.message;
        datos.forEach((element: { alumnos: any}) => {
          let alumn0 = element.alumnos[0];
          //console.log(alumn0);
          let alumno = {
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