import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompartirDatosService {
  curso: any;
  alumno: any;
  empresa: any;
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
    this.empresa = {
      'id': "",
      'nombre': "",
      'provincia': "",
      'localidad': "",
      'calle': "",
      'cp': "",
      'cif': "",
      'tlf': "",
      'email': ""
    }
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

  setEmpresa(empresa: any){
    this.empresa = empresa;
  }

  getEmpresa(){
    return this.empresa;
  }
}
