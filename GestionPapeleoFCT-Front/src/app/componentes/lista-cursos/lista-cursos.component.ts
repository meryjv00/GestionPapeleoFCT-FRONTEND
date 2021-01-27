import { Component, OnInit } from '@angular/core';
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
    if (!loginService.isUserSignedIn()){
      this.router.navigate(['/login']);
    }
    this.cursos = [];
  }

  ngOnInit(): void {
    this.getCursos();
  }

  getCursos() {
    this.listaCursosService.getCursos().subscribe(
      (response: any) => {
        console.log(response.message);
        const cursos = response.message;
        cursos.forEach((element: { id: any; dniTutor: any; familiaProfesional: any; cicloFormativo: any; cicloFormativoA: any;
          cursoAcademico: any; nHoras: any; cursos: any}) => {
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
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
