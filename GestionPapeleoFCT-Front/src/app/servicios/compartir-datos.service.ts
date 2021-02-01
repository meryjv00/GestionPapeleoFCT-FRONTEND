import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompartirDatosService {
  curso: any;
  alumno: any;
  constructor() {
    this.curso = {
      'id': "",
      'tutor': "",
      'familiaProfesional': "",
      'cicloFormativo': "",
      'cicloFormativoA': "",
      'cursoAcademico': "",
      'nHoras': ""
    }
    this.alumno = {
      'id': "",
      'dni': "",
      'nombre': "",
      'apellidos': "",
      'localidad': "",
      'residencia': "",
      'correo': "",
      'telefono': ""
    };
   }

  setCurso(curso: any){
    this.curso = curso;
  }

  getCurso(){
    return this.curso;
  }

  setAlumno(alumno: any){
    this.alumno = alumno;
  }

  getAlumno(){
    return this.alumno;
  }
}
