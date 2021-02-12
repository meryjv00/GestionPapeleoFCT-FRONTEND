import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnexosService } from 'src/app/servicios/anexos.service';
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
    selector: 'app-lista-cursos',
    templateUrl: './lista-cursos.component.html',
    styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit {
    cursos: any[];
    alumnos: any[];
    anexos: any[];
    cursoSeleccionado: any;
    haCambiado = false;
    user: any;
    mensaje: any;
    idUpdate: any;
    cicloFormativoSelect = new FormControl('');

    constructor(private listaCursosService: ListaCursosService, private loginService: LoginService, private router: Router, private route: ActivatedRoute,
        private CompartirDatos: CompartirDatosService, private AnexosService: AnexosService, private cursosService: CursosService) {
        if (!loginService.isUserSignedIn()) {
            this.router.navigate(['/login']);
        }
        this.cursos = [];
        this.alumnos = [];
        this.anexos = [];
        this.mensaje = "";
        this.user = this.loginService.getUser();
    }

    ngOnInit(): void {
        if (this.user.rol === 'Jefe de estudios') {
            this.getCursos();
        } else if (this.user.rol === 'Tutor') {
            this.getMisCursos(this.user.dni);
        }
        this.getAnexos();

        // Si existe recojo el curso modificado para volver a el
        if (this.route.snapshot.paramMap.get('id') != null) {
            this.idUpdate = this.route.snapshot.paramMap.get('id');
        }
    }

    /**
     * Carga todos los cursos 
     * Método para el jefe de estudios
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
                if (this.idUpdate) {
                    this.onChange(this.idUpdate);
                } else {
                    this.onChange(this.cursos[0].id);
                }
                console.log(this.cursoSeleccionado);
                console.log(this.cursos);

            },
            (error) => {
                console.log(error);
            }
        );
    }

    /**
     * Carga los cursos pertenecientes a un tutor
     * Método para los tutores de algun curso
     */
    getMisCursos(dni: any) {
        this.listaCursosService.getMisCursos(dni).subscribe(
            (response: any) => {
                //console.log(response.message);
                //Si se acaba de registrar y no tiene cursos asignados devuelve un array de 0 comprobamos esto:
                let cursos = response.message;
                if (cursos.length == 0) {
                    this.mensaje = "No tienes ningún curso asignado todavía";
                } else {
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
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    /**
     * Carga los alumnos pertenecientes a un curso
     * @param id 
     */
    getAlumnos(id: any) {
        this.listaCursosService.getAlumnos(id).subscribe(
            (response: any) => {
                const datos = response.message;
                datos.forEach((element: { alumnos: any }) => {
                    let alumn0 = element.alumnos[0];
                    let alumno = {
                        'id': alumn0.id,
                        'dni': alumn0.dni,
                        'nombre': alumn0.nombre,
                        'apellidos': alumn0.apellidos,
                        'localidad': alumn0.localidad,
                        'residencia': alumn0.residencia,
                        'correo': alumn0.correo,
                        'telefono': alumn0.tlf
                    };
                    this.alumnos.push(alumno);
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    /**
     * Evento del select que obtiene el curso seleccionado
     * @param value 
     */
    onChange(value: any) {
        //console.log(value);
        this.haCambiado = true;
        this.cursos.forEach((curso: { id: any; }) => {
            if (value == curso.id) {
                this.cursoSeleccionado = curso;
            }
        });
        this.alumnos = [];
        this.getAlumnos(this.cursoSeleccionado.id);
    }

    /**
     * Vamos a la vista añadir alumno pasandole los datos del curso 
     * mediante un servicio para recuperarla en el componente nuevo alumno
     */
    addAlumno() {
        this.CompartirDatos.setCurso(this.cursoSeleccionado);
        this.router.navigate(['/nuevoAlumno']);
    }

    /**
    * Vamos a la vista actualizar alumno pasandole los datos del alumno seleccionado 
    * mediante un servicio para recuperarla en el componente alumno
    */
    updateAlumno(alumno: any) {
        this.CompartirDatos.setAlumno(alumno);
        this.router.navigate(['/alumno']);
    }


    /**
     * Obtiene todos los anexos disponibles
     */
    getAnexos() {
        this.AnexosService.getAnexos().subscribe(
            (response: any) => {
                let anexos = response.message;
                anexos.forEach((element: {
                    id: any; nombre: any; tipo: any; ruta: any
                }) => {
                    let anexo = {
                        'id': element.id,
                        'nombre': element.nombre,
                        'tipo': element.tipo,
                        'ruta': element.ruta
                    };
                    this.anexos.push(anexo);
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    /**
     * Dependiendo del anexo que queramos descargar llamará a una función u otra.
     */
    descargarAnexo(id: any) {
        alert('Descargar anexo ' + id);
    }

    // Método para añadir un nuevo curso
    newCurso() {
        this.router.navigate(['/nuevoCurso']);
    }

    // Método para modificar un curso
    updateCurso(curso: any) {
        this.CompartirDatos.setCurso(curso);
        this.router.navigate(['/actualizarCurso']);
    }

    // Método para eliminar un curso
    deleteCurso() {
        // Sustituir por un modal en la siguiente versión
        let seguroEliminar = confirm("¿Estás seguro de que quieres eliminar el curso de la Base de datos?");
        if (seguroEliminar) {
            this.cursosService.deleteCurso(this.cursoSeleccionado.id).subscribe(
            (response: any) => {
                this.cursos = [];
                this.getCursos();
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
            alert("Empresa eliminada.");
            this.router.navigate(['/listaCursos']);
        }
    }

}

