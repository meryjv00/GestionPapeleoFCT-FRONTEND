import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';
import { Console } from 'console';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})

export class AdministracionComponent implements OnInit {
  //------------------------------------
  //--Formularios CSV
  submittedProfesores = false;
  submittedAlumnos = false;
  profesoresCSV: FormGroup;
  alumnosCSV: FormGroup;
  //--Cursos
  haCambiado = false;
  cursos: any[]; //Cursos importación 
  cursoSeleccionado: any;
  totalCursos: any;
  cursosImportados = 0;
  //------------------------------------
  jefesEstudio: any[];
  tutorSelecccionado: any;
  //------------------------------------
  //--Tutores (Asignación tutor a curso)
  cursos2: any[]; //Cursos totales
  tutores: any[];
  tutorSelecccionado2: any;
  cursoSeleccionado2: any;
  cursosSinTutor: any[];

  //------------------------------------------------------------
  //--CONSTRUCTOR
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
    this.cursos2 = [];
    this.jefesEstudio = [];
    this.tutores = [];
    this.cursosSinTutor = [];
  }

  //----------------------------------------------------------
  ngOnInit(): void {
    this.getCursos();
    this.getCursosSinTutor();
    this.getJefesEstudio();
    this.getTutores();
  }

  //----------------------------------------------------------
  get formularioProfesores() { return this.profesoresCSV.controls; }
  get formularioAlumnos() { return this.alumnosCSV.controls; }

  //----------------------------------------------------------
  //-------------------------CURSOS---------------------------
  //----------------------------------------------------------

  /**
   * Se obtienen todos los cursos de la aplicación para la importación CSV de cada curso
   */
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
          this.cursos2.push(curso);
        });
        this.onChange(this.cursos[0].id);
        this.onChangeCurso(this.cursos[0].id);
        this.totalCursos = this.cursos.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Guarda en una variable el curso seleccionado del select
   * @param value Recibe como parametro el id del curso seleccionado
   */
  onChange(value: any) {
    this.haCambiado = true;
    this.cursos.forEach((curso: { id: any; }) => {
      if (value == curso.id) {
        this.cursoSeleccionado = curso;
      }
    });
    //console.log('Curso seleccionado: ' + this.cursoSeleccionado.cicloFormativoA);
  }

  //----------------------------------------------------------
  //-------------------------CSV------------------------------
  //----------------------------------------------------------
  /**
   * Se añaden nuevos profesores del CSV insertado
   */
  onSubmitProfesores() {
    this.submittedProfesores = true;
    if (this.profesoresCSV.invalid) {
      return;
    }
    var csv = this.profesoresCSV.value.profesoresCSV;
    console.log(csv);
    this.administracionService.insertProfesores(csv).subscribe(
      (response: any) => {
        console.log(response.message);
        alert("Profesores añadidos correctamente");
      },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(['/csv']);
  }

  /**
   * Se añaden nuevos alumnos del CSV insertado
   */
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
        this.cursosImportados++;
        this.onChange(this.cursos[0].id);
      },
      (error) => {
        console.log(error);
      }
    );
    alert("Alumnos del curso " + this.cursoSeleccionado.cicloFormativoA + " insertados");
    this.router.navigate(['/csv']);
  }


  //----------------------------------------------------------
  //-------------------------TUTORES--------------------------
  //----------------------------------------------------------

  /**
   * Obtiene todos los jefes de estudio del centro
   */
  getTutores() {
    this.administracionService.getTutores().subscribe(
      (response: any) => {
        //console.log(response);
        let profesores = response.message;
        if (profesores.length > 0) {
          profesores.forEach((element: {
            id: any; dni: any; apellidos: any; nombre: any; localidad: any;
            residencia: any; correo: any; tlf: any;
          }) => {
            let profesor = {
              'id': element.id,
              'dni': element.dni,
              'apellidos': element.apellidos,
              'nombre': element.nombre,
              'localidad': element.localidad,
              'residencia': element.residencia,
              'correo': element.correo,
              'tlf': element.tlf
            };
            this.tutores.push(profesor);
          });
          this.onChangeTutor(this.tutores[0].dni);
          this.onChangeTut(this.tutores[0].dni);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
  * Guarda el tutor seleccionado en una variable
  * @param value Obtiene como valor el dni del tutor seleccionado
  */
  onChangeTutor(value: any) {
    this.tutores.forEach((tutor: { dni: any; }) => {
      if (value == tutor.dni) {
        this.tutorSelecccionado2 = tutor;
      }
    });
    //console.log('Tutor seleccionado: ' + this.tutorSelecccionado2.nombre);
  }

  /**
 * Guarda en una variable el curso seleccionado del select
 * @param value Recibe como parametro el id del curso seleccionado
 */
  onChangeCurso(value: any) {
    this.haCambiado = true;
    this.cursos.forEach((curso: { id: any; }) => {
      if (value == curso.id) {
        this.cursoSeleccionado2 = curso;
      }
    });
    //console.log('Curso seleccionado2: ' + this.cursoSeleccionado2.cicloFormativoA);
  }

  /**
   * Asigna un tutor a un curso
   */
  elegirTutorCurso() {
    if (!this.tutorSelecccionado2) {
      alert('No hay ningún tutor disponible')
    } else {
      let convertirTutor = confirm("¿Estás seguro de que quieres convertir a " + this.tutorSelecccionado2.nombre + " en tutor del curso " + this.cursoSeleccionado2.cicloFormativoA + "?");
      if (convertirTutor) {
        this.administracionService.addTutorCurso(this.tutorSelecccionado2, this.cursoSeleccionado2).subscribe(
          (response: any) => {
            console.log(response);
            alert('Ahora ' + this.tutorSelecccionado2.nombre + ' ' + this.tutorSelecccionado2.apellidos + ' es tutor de ' + this.cursoSeleccionado2.cicloFormativoA);

            //Elimina el curso asignado de la lista de cursos sin tutor
            this.cursosSinTutor.forEach((curso, index) => {
              if (curso.id == this.cursoSeleccionado2.id) {
                this.cursosSinTutor.splice(index, 1);
              }
            });
          },
          (error) => {
            alert('No se ha podido asignar a ' + this.tutorSelecccionado2.nombre + ' ' + this.tutorSelecccionado2.apellidos + ' como tutor de ' + this.cursoSeleccionado2.cicloFormativoA);
            console.log(error);
          }
        );
      }
    }
  }

  getCursosSinTutor() {
    this.listaCursosService.getCursosSinTutor().subscribe(
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
          this.cursosSinTutor.push(curso);
        });
      },
      (error) => {
        console.log(error);
      }
    );

  }

  //----------------------------------------------------------
  //--------------------JEFES DE ESTUDIO----------------------
  //----------------------------------------------------------
  /**
    * Obtiene todos los jefes de estudio del centro
    */
  getJefesEstudio() {
    this.administracionService.getJefesEstudio().subscribe(
      (response: any) => {
        //console.log(response);
        let profesores = response.message;
        if (profesores.length > 0) {
          profesores.forEach((element: {
            id: any; dni: any; apellidos: any; nombre: any; localidad: any;
            residencia: any; correo: any; tlf: any;
          }) => {
            let profesor = {
              'id': element.id,
              'dni': element.dni,
              'apellidos': element.apellidos,
              'nombre': element.nombre,
              'localidad': element.localidad,
              'residencia': element.residencia,
              'correo': element.correo,
              'tlf': element.tlf
            };
            this.jefesEstudio.push(profesor);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Desasigna el jefe de estudios cuyo dni recibe y lo convierte en tutor
   */
  desasignarJefeEstudios(dni: any) {
    let convertirTutor = confirm("¿Estás seguro de que quieres desasignar a este usuario del rol jefe de estudios? Se convertirá en tutor");
    if (convertirTutor) {
      this.administracionService.deleteJefeEstudio(dni).subscribe(
        (response: any) => {
          console.log(response);
          this.jefesEstudio.forEach((profesor, index) => {
            if (profesor.dni == dni) {
              this.jefesEstudio.splice(index, 1);
              this.tutores.push(profesor);
            }
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  /**
   * Guarda el profesor seleccionado en una variable
   * @param value Obtiene como valor el dni del profesor seleccionado
   */
  onChangeTut(value: any) {
    this.tutores.forEach((profesor: { dni: any; }) => {
      if (value == profesor.dni) {
        this.tutorSelecccionado = profesor;
      }
    });
    //console.log('Profesor seleccionado: ' + this.tutorSelecccionado.nombre);
  }

  /**
   * Método que añade un nuevo jefe de estudio
   */
  elegirJefeEstudios() {
    if (!this.tutorSelecccionado) {
      alert('No hay ningún tutor disponible')
    } else {
      let convertirJefe = confirm("¿Estás seguro de que quieres desasignar a este usuario del rol tutor? Se convertirá en jefe de estudios");
      if (convertirJefe) {
        this.administracionService.addJefeEstudios(this.tutorSelecccionado).subscribe(
          (response: any) => {
            //console.log(response);
            this.tutores.forEach((tutor, index) => {
              if (tutor.dni == this.tutorSelecccionado.dni) {
                this.tutores.splice(index, 1);
                this.jefesEstudio.push(this.tutorSelecccionado);
              }
            });
            alert('Ahora ' + this.tutorSelecccionado.nombre + ' ' + this.tutorSelecccionado.apellidos + ' es jefe de estudios');
          },
          (error) => {
            alert('Ha ocurrido un error al asignar a ' + this.tutorSelecccionado.nombre + ' ' + this.tutorSelecccionado.apellidos + ' como jefe de estudios.');
            console.log(error);
          }
        );
      }
    }
  }
}
