import { Injectable } from '@angular/core';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class CompartirDatosService {
  empresa: any;
  curso: any;
  alumno: any;
  //Almacenará mediante esta key los datos de login en session storage
  public static readonly SESSION_STORAGE_KEY_AL: string = "alumnoSeleccionado";
  public static readonly SESSION_STORAGE_KEY_CUR: string = "cursoSeleccionado";

  constructor() {
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

  setCurso(curso: any) {
    sessionStorage.setItem(CompartirDatosService.SESSION_STORAGE_KEY_CUR, JSON.stringify(curso));
  }

  getCurso() {
    let curso: any | null = {
      cicloFormativo: "",
      cicloFormativoA: "",
      cursoAcademico: "",
      familiaProfesional: "",
      id: "",
      nHoras: "",
      tutor: ""
    };
    if (this.isCursoSeleccionado()) {
      curso = sessionStorage.getItem(CompartirDatosService.SESSION_STORAGE_KEY_CUR);
      curso = JSON.parse(curso);
    }
    return curso;
  }
  public isCursoSeleccionado(): boolean {
    return !_.isEmpty(sessionStorage.getItem(CompartirDatosService.SESSION_STORAGE_KEY_CUR));
  }

  //----------------------------------------------------------------------------------
  //--------------------------------------ALUMNO---------------------------------------
  //----------------------------------------------------------------------------------
  /**
   * Guarda el alumno seleccionado en session storage oara poder cargarlo en la vista alumno
   * cada vez que se recarga el componente
   * @param alumno 
   */
  setAlumno(alumno: any) {
    sessionStorage.setItem(CompartirDatosService.SESSION_STORAGE_KEY_AL, JSON.stringify(alumno));
  }

  /**
   * Obtiene del session storage el alumno seleccionado
   */
  getAlumno() {
    let alumno: any | null = {
      apellidos: "",
      correo: "",
      dni: "",
      id: "",
      localidad: "",
      nombre: "",
      residencia: "",
      telefono: ""
    };
    if (this.isAlumnoSeleccionado()) {
      alumno = sessionStorage.getItem(CompartirDatosService.SESSION_STORAGE_KEY_AL);
      alumno = JSON.parse(alumno);
    }
    return alumno;
  }
  /**
 * Devuelve si en session storage está almacenado o no el alumno seleccionado
 */
  public isAlumnoSeleccionado(): boolean {
    return !_.isEmpty(sessionStorage.getItem(CompartirDatosService.SESSION_STORAGE_KEY_AL));
  }


  setEmpresa(empresa: any) {
    this.empresa = empresa;
  }

  getEmpresa() {
    return this.empresa;
  }
}
