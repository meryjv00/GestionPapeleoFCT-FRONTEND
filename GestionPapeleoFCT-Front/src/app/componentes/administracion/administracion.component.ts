import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})

export class AdministracionComponent implements OnInit {
  //--Formularios CSV
  submittedProfesores = false;
  submittedAlumnos = false;
  profesoresCSV: FormGroup;
  alumnosCSV: FormGroup;
  profCSV: any;
  alumnCSV: any;

  anio: FormGroup;
  submittedAnio = false;

  //--Arrays
  cursos: any[];  //Todos los cursos
  cursosSinAlumnos: any[]; //Cursos sin alumnos todavía
  cursosSinTutor: any[]; //Cursos sin tutor todavía
  cuentasAdministrar: any[]; //Cuentas de tutores y jefes de estudio inactivas
  tutores: any[]; //Tutores de la aplicación
  cuentasActivas: any[]; //Cuentas de tutores y jefes de estudio activas

  //--Variables necesarias
  cursoSeleccionado: any; //Curso sin alumnos seleccionado
  cursoSeleccionado2: any; //Curso asignar tutor curso
  tutorSeleccionado: any; //Tutor seleccionado para asignar a un curso
  haCambiado = false;
  cursosCargados = false;
  personaSeleccionada: any;

  //------------------------------------------------------------
  //--CONSTRUCTOR
  constructor(private listaCursosService: ListaCursosService, private formBuilder: FormBuilder, private administracionService: AdministracionService,
    private loginService: LoginService, private router: Router, private modal: NgbModal) {
    if (!loginService.isUserSignedIn()) {
      this.router.navigate(['/login']);
    }

    this.profesoresCSV = this.formBuilder.group({
      profesoresCSV: ['', [Validators.required]]
    });
    this.alumnosCSV = this.formBuilder.group({
      alumnosCSV: ['', [Validators.required]]
    });
    this.anio = this.formBuilder.group({
      anio: ['', [Validators.required]]
    });
    this.cursosSinAlumnos = [];
    this.cursos = [];
    this.cuentasAdministrar = [];
    this.tutores = [];
    this.cursosSinTutor = [];
    this.cuentasActivas = [];
  }

  //----------------------------------------------------------
  ngOnInit(): void {
    this.getCursos();
    this.getCursosSinAlumnos();
    this.getCursosSinTutor();
    this.getCuentasAdministrar();
    this.getTutores();
    this.getCuentasActivas();
  }

  //----------------------------------------------------------
  get formularioProfesores() { return this.profesoresCSV.controls; }
  get formularioAlumnos() { return this.alumnosCSV.controls; }
  get formularioAnio() { return this.anio.controls; }

  //----------------------------------------------------------
  //----------------------AÑO ACADEMICO-----------------------
  //----------------------------------------------------------
  onSubmitAnio(){
    this.submittedAnio = true;
    if (this.anio.invalid) {
      return;
    }
    this.administracionService.updateAnio(this.anio.value.anio).subscribe(
      (response: any) => {
        console.log(response.message);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Año académico actualizado con éxito';
        modalRef.componentInstance.exito = true;
      },
      (error) => {
        console.log(error);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un error al actualizar el año académico';
        modalRef.componentInstance.exito = false;
      }
    );
  }
  
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
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Se obtienen los cursos que todavía no tienen asignados alumnos
   */
  getCursosSinAlumnos() {
    this.listaCursosService.getCursosSinAlumnos().subscribe(
      (response: any) => {
        let cursos = response.message;
        cursos.forEach((element: {
          id: any; familiaProfesional: any; cicloFormativo: any; cicloFormativoA: any;
          cursoAcademico: any; nHoras: any; cursos: any;
        }) => {
          let curso = {
            'id': element.id,
            'familiaProfesional': element.familiaProfesional,
            'cicloFormativo': element.cicloFormativo,
            'cicloFormativoA': element.cicloFormativoA,
            'cursoAcademico': element.cursoAcademico,
            'nHoras': element.nHoras
          };
          this.cursosSinAlumnos.push(curso);
        });
        this.onChange(this.cursosSinAlumnos[0].id);
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
    this.cursosSinAlumnos.forEach((curso: { id: any; }) => {
      if (value == curso.id) {
        this.cursoSeleccionado = curso;
      }
    });
  }

  //----------------------------------------------------------
  //-------------------------CSV------------------------------
  //----------------------------------------------------------
  /**
   * Se guarda el archivo CSV de los profesores introducido
   * @param event 
   */
  guardarProfesoresCSV(event: any) {
    this.profCSV = <File>event.target.files[0];
  }

  /**
   * Se guarda el archivo CSV de los alumnos introducido
   * @param event 
   */
  guardarAlumnosCSV(event: any) {
    this.alumnCSV = <File>event.target.files[0];
  }

  /**
   * Se añaden nuevos profesores del CSV insertado
   */
  onSubmitProfesores() {
    this.submittedProfesores = true;
    if (this.profesoresCSV.invalid) {
      return;
    }

    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = '¿Estás seguro que quieres insertar estos profesores en la base de datos?';
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.administracionService.insertProfesores(this.profCSV).subscribe(
        (response: any) => {
          //alert(response.message);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Profesores insertados correctamente';
          modalRef.componentInstance.exito = true;
        },
        (error) => {
          console.log(error);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Ha ocurrido al insertar los profesores';
          modalRef.componentInstance.exito = false;
        }
      );
    });

  }

  /**
   * Se añaden nuevos alumnos del CSV insertado
   */
  onSubmitAlumnos() {
    this.submittedAlumnos = true;
    if (this.alumnosCSV.invalid) {
      return;
    }
    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = "¿Estás seguro que quieres insertar estos alumnos en el curso " + this.cursoSeleccionado.cicloFormativoA + "?";
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.administracionService.insertAlumnos(this.alumnCSV, this.cursoSeleccionado).subscribe(
        (response: any) => {
          //alert("Alumnos del curso " + this.cursoSeleccionado.cicloFormativoA + " insertados");
          this.cursosSinAlumnos.forEach((curso, index) => {
            if (curso.id == this.cursoSeleccionado.id) {
              this.cursosSinAlumnos.splice(index, 1);
            }
          });
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Alumnos del curso ' + this.cursoSeleccionado.cicloFormativoA + ' insertados correctamente';
          modalRef.componentInstance.exito = true;
          this.onChange(this.cursosSinAlumnos[0].id);
        },
        (error) => {
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = "No se han podido insertar los alumnos del curso " + this.cursoSeleccionado.cicloFormativoA +
            ".Asegurese de que el CSV introducido es correcto. En ese caso, ¿Quieres reiniciar los cursos y empezar de nuevo? Esto borrará todos los alumnos de la base de datos.";
          modalRef.componentInstance["storeOk"].subscribe((event: any) => {
            this.administracionService.reiniciarAlumnos().subscribe(
              (response: any) => {
                const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
                modalRef.componentInstance.mensaje = response.message;
                modalRef.componentInstance.exito = true;
              },
              (error) => {
                console.log(error);
                const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
                modalRef.componentInstance.mensaje = 'Ha ocurrido un error al reiniciar los alumnos';
                modalRef.componentInstance.exito = false;
              }
            );
            this.cursosSinAlumnos = [];
            this.getCursosSinAlumnos();
          });
        }
      );
    });

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
    console.log(this.tutorSeleccionado);
    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres convertir a ' + this.tutorSeleccionado.nombre + " en tutor del curso " + this.cursoSeleccionado2.cicloFormativoA + "?";
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.administracionService.addTutorCurso(this.tutorSeleccionado, this.cursoSeleccionado2).subscribe(
        (response: any) => {
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Ahora ' + this.tutorSeleccionado.nombre + ' ' + this.tutorSeleccionado.apellidos + ' es tutor de ' + this.cursoSeleccionado2.cicloFormativoA;
          modalRef.componentInstance.exito = true;

          //Elimina el curso asignado de la lista de cursos sin tutor
          this.cursosSinTutor.forEach((curso, index) => {
            if (curso.id == this.cursoSeleccionado2.id) {
              this.cursosSinTutor.splice(index, 1);
              this.cursoSeleccionado2 = this.cursosSinTutor[0];
            }
          });
        },
        (error) => {
          console.log(error);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'No se ha podido asignar a ' + this.tutorSeleccionado.nombre + ' ' + this.tutorSeleccionado.apellidos + ' como tutor de ' + this.cursoSeleccionado2.cicloFormativoA;
          modalRef.componentInstance.exito = false;
        }
      );
    });

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
              'rol': 2,
              'activo': 0
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
              'rol': 3,
              'activo': 0
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
    var rol: string;
    if (this.personaSeleccionada.rol == 2) {
      rol = "tutor";
    } else {
      rol = "jefe de estudios";
    }

    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = "¿Estás seguro de que quieres que " + this.personaSeleccionada.nombre + ' ' + this.personaSeleccionada.apellidos + " se convierta en " + rol + "?";
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.administracionService.cambiarRol(dni, this.personaSeleccionada.rol).subscribe(
        (response: any) => {
          //Busca esa persona para actualizarle el rol
          if (this.personaSeleccionada.activo == 0) {
            this.cuentasAdministrar.forEach((profesor, index) => {
              if (profesor.dni == dni) {
                if (this.personaSeleccionada.rol == 2) {
                  profesor.rol = 3;
                } else {
                  profesor.rol = 2;
                }
              }
            });

          } else {
            this.cuentasActivas.forEach((profesor, index) => {
              if (profesor.dni == dni) {
                if (this.personaSeleccionada.rol == 2) {
                  profesor.rol = 3;
                  //Añadir como tutor
                  this.tutores.push(profesor);
                  if (this.tutores.length == 1) {
                    this.tutorSeleccionado = profesor;
                  }
                } else {
                  profesor.rol = 2;
                  //Eliminar como tutor
                  this.tutores.forEach((tutor, index) => {
                    if (tutor.dni == profesor.dni) {
                      this.tutores.splice(index, 1);
                    }
                  });
                }
              }
            });
          }
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = this.personaSeleccionada.nombre + ' ' + this.personaSeleccionada.apellidos + ' es ahora ' + rol;
          modalRef.componentInstance.exito = true;
        },
        (error) => {
          console.log(error);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Ha ocurrido un error al cambiar el rol de ' + this.personaSeleccionada.nombre + ' ' + this.personaSeleccionada.apellidos;
          modalRef.componentInstance.exito = false;
        }
      );
    });

  }

  /**
   * Activa la cuenta cuyo dni reciba por parámetro
   * @param dni 
   */
  activarDesactivarCuenta(dni: any) {
    this.buscaPersonaPorDni(dni);
    console.log(this.personaSeleccionada.activo);
    var accion: string;
    var accion2: string;
    if (this.personaSeleccionada.activo == 0) {
      accion = "activar";
      accion2 = "activada";
    } else {
      accion = "desactivar";
      accion2 = "desactivada";
    }

    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = "¿Estás seguro de que quieres " + accion + "  la cuenta de " + this.personaSeleccionada.nombre + ' ' + this.personaSeleccionada.apellidos + "?";
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {

      this.administracionService.activarDesactivarCuenta(dni).subscribe(
        (response: any) => {
          //Activar cuentas
          if (this.personaSeleccionada.activo == 0) {
            this.cuentasAdministrar.forEach((profesor, index) => {
              if (profesor.dni == dni) {
                //Añade tutor 
                if (profesor.rol == 3) {
                  this.tutores.push(profesor);
                  if (!this.tutorSeleccionado) {
                    this.tutorSeleccionado = profesor;
                  }
                }
                this.cuentasAdministrar.splice(index, 1);
                this.cuentasActivas.push(this.personaSeleccionada);
                this.personaSeleccionada.activo = 1;
              }
            });
          } else { //Desactivar cuentas
            this.cuentasActivas.forEach((profesor, index) => {
              if (profesor.dni == dni) {
                //Elimina tutor
                if (profesor.rol == 3) {
                  this.tutores.forEach((tutor, index) => {
                    if (tutor.dni == profesor.dni) {
                      this.tutores.splice(index, 1);
                    }
                  });
                }
                this.cuentasActivas.splice(index, 1);
                this.cuentasAdministrar.push(this.personaSeleccionada);
                this.personaSeleccionada.activo = 0;
              }
            });
          }
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Cuenta ' + accion2 + ' correctamente';
          modalRef.componentInstance.exito = true;

        },
        (error) => {
          console.log(error);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Ha ocurrido un error al' + accion + ' la cuenta';
          modalRef.componentInstance.exito = false;
        }
      );
    });

  }

  /**
   * Deniega acceso a la cuenta cuyo dni recibe
   * @param dni 
   */
  denegarAcceso(dni: any) {
    this.buscaPersonaPorDni(dni);
    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = "¿Estás seguro de que quieres denegar el acceso a " + this.personaSeleccionada.nombre + ' ' + this.personaSeleccionada.apellidos + "? La cuenta será borrada";
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.administracionService.denegarAccesoCuenta(dni).subscribe(
        (response: any) => {
          if (this.personaSeleccionada.activo == 0) {
            this.cuentasAdministrar.forEach((profesor, index) => {
              if (profesor.dni == dni) {
                this.cuentasAdministrar.splice(index, 1);
              }
            });
          } else {
            this.cuentasActivas.forEach((profesor, index) => {
              if (profesor.dni == dni) {
                this.cuentasActivas.splice(index, 1);
              }
            });
          }
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Usuario ' + this.personaSeleccionada.nombre + ' ' + this.personaSeleccionada.apellidos + ' eliminado correctamente';
          modalRef.componentInstance.exito = true;

        },
        (error) => {
          console.log(error);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Ha ocurrido un error al eliminar a '+ this.personaSeleccionada.nombre + ' ' + this.personaSeleccionada.apellidos;
          modalRef.componentInstance.exito = false;
        }
      );
    });
  }

  buscaPersonaPorDni(dni: any) {
    this.cuentasAdministrar.forEach((persona, index) => {
      if (persona.dni == dni) {
        this.personaSeleccionada = persona;
        return;
      }
    });
    this.cuentasActivas.forEach((persona, index) => {
      if (persona.dni == dni) {
        this.personaSeleccionada = persona;
        return;
      }
    });

  }

  getCuentasActivas() {
    this.administracionService.getCuentasActivas().subscribe(
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
              'rol': 2,
              'activo': 1
            };
            this.cuentasActivas.push(profesor);
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
              'rol': 3,
              'activo': 1
            };
            this.cuentasActivas.push(profesor);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  activar(value: any) {
    if (value == 'csv') {
      document.getElementById('nav-csv-tab')?.classList.add('bg-white', 'border2');
      document.getElementById('nav-admin-tab')?.classList.remove('bg-white', 'border2');
      document.getElementById('nav-admin2-tab')?.classList.remove('bg-white', 'border2');
    } else if (value == 'admin') {
      document.getElementById('nav-admin-tab')?.classList.add('bg-white', 'border2');
      document.getElementById('nav-admin2-tab')?.classList.remove('bg-white', 'border2');
      document.getElementById('nav-csv-tab')?.classList.remove('bg-white', 'border2');
    } else if (value == 'tutores') {
      document.getElementById('nav-admin2-tab')?.classList.add('bg-white', 'border2');
      document.getElementById('nav-admin-tab')?.classList.remove('bg-white', 'border2');
      document.getElementById('nav-csv-tab')?.classList.remove('bg-white', 'border2');
    }
  }
}
