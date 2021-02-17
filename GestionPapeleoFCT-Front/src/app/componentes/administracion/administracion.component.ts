import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';

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
  profCSV: any;
  alumnCSV: any;

  //--Cursos
  haCambiado = false;
  cursos: any[]; //Cursos importación 
  cursoSeleccionado: any;
  totalCursos: any;
  cursosImportados = 0;
  //------------------------------------
  cuentasAdministrar: any[];
  personaSeleccionada: any;
  //------------------------------------
  //--Tutores (Asignación tutor a curso)
  cursos2: any[]; //Cursos totales
  tutores: any[];
  tutorSeleccionado: any;
  cursoSeleccionado2: any;
  cursosSinTutor: any[];
  cursosCargados = false;

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
    this.cuentasAdministrar = [];
    this.tutores = [];
    this.cursosSinTutor = [];
  }

  //----------------------------------------------------------
  ngOnInit(): void {
    this.getCursos();
    this.getCursosSinTutor();
    this.getCuentasAdministrar();
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
    this.administracionService.insertProfesores(this.profCSV).subscribe(
      (response: any) => {
        console.log(response.message);
        alert("Profesores añadidos correctamente");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  guardarProfesoresCSV(event: any) {
    this.profCSV = <File>event.target.files[0]
  }
  guardarAlumnosCSV(event: any) {
    this.alumnCSV = <File>event.target.files[0]
  }
  
  /**
   * Se añaden nuevos alumnos del CSV insertado
   */
  onSubmitAlumnos() {
    this.submittedAlumnos = true;
    if (this.alumnosCSV.invalid) {
      return;
    }
    this.administracionService.insertAlumnos(this.alumnCSV,this.cursoSeleccionado).subscribe(
      (response: any) => {
        console.log(response.message);
        this.cursos.forEach((curso, index) => {
          if (curso.id == this.cursoSeleccionado.id) {
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
   * Obtiene todos los tutores del centro cuyas cuentas estén activadas
   */
  getTutores() {
    this.administracionService.getTutores().subscribe(
      (response: any) => {
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
        this.tutorSeleccionado = tutor;
      }
    });
  }

  /**
 * Guarda en una variable el curso seleccionado del select
 * @param value Recibe como parametro el id del curso seleccionado
 */
  onChangeCurso(value: any) {
    this.cursosCargados = true;
    this.cursos.forEach((curso: { id: any; }) => {
      if (value == curso.id) {
        this.cursoSeleccionado2 = curso;
      }
    });
  }

  /**
   * Asigna un tutor a un curso
   */
  elegirTutorCurso() {
    if (!this.tutorSeleccionado) {
      alert('No hay ningún tutor disponible')
    } else {
      let convertirTutor = confirm("¿Estás seguro de que quieres convertir a " + this.tutorSeleccionado.nombre + " en tutor del curso " + this.cursoSeleccionado2.cicloFormativoA + "?");
      if (convertirTutor) {
        this.administracionService.addTutorCurso(this.tutorSeleccionado, this.cursoSeleccionado2).subscribe(
          (response: any) => {
            alert('Ahora ' + this.tutorSeleccionado.nombre + ' ' + this.tutorSeleccionado.apellidos + ' es tutor de ' + this.cursoSeleccionado2.cicloFormativoA);

            //Elimina el curso asignado de la lista de cursos sin tutor
            this.cursosSinTutor.forEach((curso, index) => {
              if (curso.id == this.cursoSeleccionado2.id) {
                this.cursosSinTutor.splice(index, 1);
                this.cursoSeleccionado2 = this.cursosSinTutor[0];
              }
            });
          },
          (error) => {
            alert('No se ha podido asignar a ' + this.tutorSeleccionado.nombre + ' ' + this.tutorSeleccionado.apellidos + ' como tutor de ' + this.cursoSeleccionado2.cicloFormativoA);
            console.log(error);
          }
        );
      }
    }
  }

  /**
   * Obtiene los cursos que no tienen asignado tutor todavía
   */
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
        this.onChangeCurso(this.cursosSinTutor[0].id);
      },
      (error) => {
        console.log(error);
      }
    );

  }


  //----------------------------------------------------------
  //--------------------ADMINISTRACIÓN CUENTAS----------------
  //----------------------------------------------------------
  /**
    * Obtiene todos los jefes de estudio del centro
    */
  getCuentasAdministrar() {
    this.administracionService.getCuentasAdministrar().subscribe(
      (response: any) => {
        //Se guardan los jefes de estudio (rol = 2)
        let jefes = response.message[0];
        if (jefes.length > 0) {
          jefes.forEach((element: {
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
              'tlf': element.tlf,
              'rol': 2
            };
            this.cuentasAdministrar.push(profesor);
          });
        }
        //Se guardan los tutores
        let tutores = response.message[1];
        if (tutores.length > 0) {
          tutores.forEach((element: {
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
              'tlf': element.tlf,
              'rol': 3
            };
            this.cuentasAdministrar.push(profesor);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Desasigna el rol de jefe de estudios al usuario cuyo dni recibe y lo convierte en tutor
   */
  cambiarRol(dni: any) {
    this.buscaPersonaPorDni(dni);
    var rol;
    if (this.personaSeleccionada.rol == 2) {
      rol = "tutor";
    } else {
      rol = "jefe de estudios";
    }
    let cambiarRol = confirm("¿Estás seguro de que quieres que " + this.personaSeleccionada.nombre + ' ' + this.personaSeleccionada.apellidos + " se convierta en " + rol + "?");
    if (cambiarRol) {
      this.administracionService.cambiarRol(dni, this.personaSeleccionada.rol).subscribe(
        (response: any) => {
          //Busca esa persona para actualizarle el rol
          this.cuentasAdministrar.forEach((profesor, index) => {
            if (profesor.dni == dni) {
              if (this.personaSeleccionada.rol == 2) {
                profesor.rol = 3;
              } else {
                profesor.rol = 2;
              }
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
   * Activa la cuenta cuyo dni reciba por parámetro
   * @param dni 
   */
  activarCuenta(dni: any) {
    this.buscaPersonaPorDni(dni);
    var rol;
    if (this.personaSeleccionada.rol == 2) {
      rol = "jefe de estudios";
    } else {
      rol = "tutor";
    }
    let activarCuenta = confirm("¿Estás seguro de que quieres activar la cuenta de " + this.personaSeleccionada.nombre + ' ' + this.personaSeleccionada.apellidos + " con rol de " + rol + " ? No hay marcha atrás");
    if (activarCuenta) {
      this.administracionService.activarCuenta(dni).subscribe(
        (response: any) => {
          this.cuentasAdministrar.forEach((profesor, index) => {
            if (profesor.dni == dni) {
              if (profesor.rol == 3) {
                this.tutores.push(profesor);
              }
              this.cuentasAdministrar.splice(index, 1);

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
   * Deniega acceso a la cuenta cuyo dni recibe
   * @param dni 
   */
  denegarAcceso(dni: any) {
    this.buscaPersonaPorDni(dni);
    let denegarAcceso = confirm("¿Estás seguro de que quieres denegar el acceso a " + this.personaSeleccionada.nombre + ' ' + this.personaSeleccionada.apellidos + "? No hay marcha atrás");
    if (denegarAcceso) {
      this.administracionService.denegarAccesoCuenta(dni).subscribe(
        (response: any) => {
          this.cuentasAdministrar.forEach((profesor, index) => {
            if (profesor.dni == dni) {
              this.cuentasAdministrar.splice(index, 1);
            }
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  buscaPersonaPorDni(dni: any) {
    this.cuentasAdministrar.forEach((persona, index) => {
      if (persona.dni == dni) {
        this.personaSeleccionada = persona;
        return;
      }
    });

  }
}
