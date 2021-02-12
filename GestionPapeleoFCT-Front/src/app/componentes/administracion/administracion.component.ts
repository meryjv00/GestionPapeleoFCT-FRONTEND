import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';
import { AnyTxtRecord } from 'dns';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})

export class AdministracionComponent implements OnInit {
  //----------------------------------------------------------
  //--VARIABLES
  submittedProfesores = false;
  submittedAlumnos = false;
  profesoresCSV: FormGroup;
  alumnosCSV: FormGroup;

  haCambiado = false;
  cursos: any[];
  cursoSeleccionado: any;

  terminado = false;
  profesorSeleccionado: any;
  profesoresSeleccionados: any[];
  profesores: any[];
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
    this.profesores = [];
    this.profesoresSeleccionados = [];
  }

  //----------------------------------------------------------
  ngOnInit(): void {
    this.getCursos();
    this.getProfesores();
    this.getJefesEstudio();
  }

  //----------------------------------------------------------
  get formularioProfesores() { return this.profesoresCSV.controls; }
  get formularioAlumnos() { return this.alumnosCSV.controls; }

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

        this.onChange(this.cursos[0].id);
      },
      (error) => {
        console.log(error);
      }
    );
    alert("Alumnos del curso " + this.cursoSeleccionado.cicloFormativoA + " insertados");
    this.router.navigate(['/csv']);
  }

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
        this.onChange(this.cursos[0].id);
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
    //console.log(this.cursoSeleccionado);
  }

  /**
   * Obtiene todos los profesores
   */
  getProfesores() {
    this.administracionService.getProfesores().subscribe(
      (response: any) => {
        //console.log(response);
        let profesores = response.message;
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
          this.profesores.push(profesor);
        });
        this.onChangeProf(this.profesores[0].dni);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  /**
   * Guarda el profesor seleccionado en una variable
   * @param value Obtiene como valor el dni del profesor seleccionado
   */
  onChangeProf(value: any) {
    this.terminado = true;
    this.profesores.forEach((profesor: { dni: any; }) => {
      if (value == profesor.dni) {
        this.profesorSeleccionado = profesor;
      }
    });
    //console.log('Profesor seleccionado: ' + this.profesorSeleccionado.nombre);
  }


  /**
   * Método que añade un nuevo jefe de estudio comprobando si
   * ya lo es o no.
   */
  elegirJefeEstudios() {
    console.log(this.profesoresSeleccionados);
    var existe = true;
    var cont = 0;
    if (this.profesoresSeleccionados.length == 0) {
      existe = false;
    } else {
      this.profesoresSeleccionados.forEach((profesor: { dni: any; }) => {
        if (this.profesorSeleccionado.dni == profesor.dni) {
          existe = true;
        } else {
          cont++;
        }
        console.log(this.profesorSeleccionado.dni + '!=' + profesor.dni);
      });
    }
    //Comprueba que en todas las posiciones no exista 
    if (cont == this.profesoresSeleccionados.length) {
      existe = false;
    }
    //Añadir nuevo jefe de estudios en caso de que no lo sea
    if (!existe) {
      this.profesoresSeleccionados.push(this.profesorSeleccionado);

      this.administracionService.addJefeEstudios(this.profesorSeleccionado).subscribe(
        (response: any) => {
          console.log(response);
          alert('Ahora ' + this.profesorSeleccionado.nombre + ' ' + this.profesorSeleccionado.apellidos + ' es jefe de estudios');
        },
        (error) => {
          alert('Ha habido un error al asignar a ' + this.profesorSeleccionado.nombre + ' ' + this.profesorSeleccionado.apellidos + ' como jefe de estudios.');
          console.log(error);
        }
      );
    } else {
      alert(this.profesorSeleccionado.nombre + ' ' + this.profesorSeleccionado.apellidos + ' ya es jefe de estudios');
    }
  }

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
            this.profesoresSeleccionados.push(profesor);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Desasigna el jefe de estudios cuyo dni recibe
   */
  desasignarJefeEstudios(dni: any) {
    this.administracionService.deleteJefeEstudio(dni).subscribe(
      (response: any) => {
        console.log(response);
        this.profesoresSeleccionados.forEach((profesor, index) => {
          if (profesor.dni == dni) {
            this.profesoresSeleccionados.splice(index, 1);
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
