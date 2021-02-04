import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaAlumnosService } from 'src/app/servicios/lista-alumnos.service';
//import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})


export class ListaAlumnosComponent implements OnInit {
  id: any; tutor: any; familiaProfesional: any; cicloFormativo: any; cicloFormativoA: any; cursoAcademico: any; nHoras: any;
  alumnos: any[];

  //private loginService: LoginService
  constructor(private route: ActivatedRoute,private listaAlumnosService: ListaAlumnosService,private router: Router) {
    /**
     *     if (!loginService.isUserSignedIn()){
      this.router.navigate(['/login']);
    }
     */
     
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
    this.getAlumnos2();
  }

  //Cargar alumnos con el id del curso
  getAlumnos() {
    this.listaAlumnosService.getAlumnos(this.id).subscribe(
      (response: any) => {
        const alumnos = response;
        alumnos.forEach((element: { dni: any; nombre: any; apellidos: any; localidad: any; residencia: any;
          correo: any; tlf: any; }) => {
          let alumno = {
            'dni': element.dni,
            'nombre': element.nombre,
            'apellidos': element.apellidos,
            'localidad': element.localidad,
            'residencia': element.residencia,
            'correo': element.correo,
            'telefono': element.tlf
          };
          this.alumnos.push(alumno);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAlumnos2() {
    let alumno = {
      'dni': '1A',
      'nombre': 'Pepa',
      'apellidos': 'Gonzales Jimenez',
      'localidad': 'Ciudad Real',
      'residencia': 'Argamasilla',
      'correo': 'pepa@gmail.com',
      'telefono': '66666666'
    };
    this.alumnos.push(alumno);
    let alumno2 = {
      'dni': '2B',
      'nombre': 'Luisa',
      'apellidos': 'Perez Sanchez',
      'localidad': 'Ciudad Real',
      'residencia': 'Almodovar',
      'correo': 'luisilla@gmail.com',
      'telefono': '888888888'
    };
    this.alumnos.push(alumno2);
  }
}