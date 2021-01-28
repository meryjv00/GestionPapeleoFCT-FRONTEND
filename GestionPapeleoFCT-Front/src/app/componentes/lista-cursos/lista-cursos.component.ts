import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})

export class ListaCursosComponent implements OnInit {

  cursos: any[];
  constructor(private listaCursosService: ListaCursosService, private loginService: LoginService, private router: Router) {
    /**
     *if (!loginService.isUserSignedIn()){
      this.router.navigate(['/login']);
    }
     */

    this.cursos = [];
  }

  ngOnInit(): void {
    this.getCursos2();
  }

  getCursos() {
    this.listaCursosService.getCursos().subscribe(
      (response: any) => {
        const cursos = response;
        cursos.forEach((element: { id: any; tutor: any; familiaProfesional: any; cicloFormativo: any; cicloFormativoA: any;
          cursoAcademico: any; nHoras: any; }) => {
          let curso = {
            'id': element.id,
            'tutor': element.tutor,
            'familiaProfesional': element.familiaProfesional,
            'cicloFormativo': element.cicloFormativo,
            'cicloFormativoA': element.cicloFormativoA,
            'cursoAcademico': element.cursoAcademico,
            'nHoras': element.nHoras
          };
          this.cursos.push(curso);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCursos2(){
    let curso = {
      'id': 1,
      'tutor': 'Fernando',
      'familiaProfesional': 'Informática',
      'cicloFormativo': 'Desarrollo de aplicaciones web',
      'cicloFormativoA': 'DAW',
      'cursoAcademico': '2020/2021',
      'nHoras': '400'
    };
    this.cursos.push(curso);
    let curso2 = {
      'id': 2,
      'tutor': 'Inma',
      'familiaProfesional': 'Informática',
      'cicloFormativo': 'Desarrollo de aplicaciones web',
      'cicloFormativoA': 'DAW',
      'cursoAcademico': '2020/2021',
      'nHoras': '412'
    };
    this.cursos.push(curso2);
  }
}
