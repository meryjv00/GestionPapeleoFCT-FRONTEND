import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnexosService } from 'src/app/servicios/anexos.service';
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ModalAddAlumnoPracticaComponent } from '../modal-add-alumno-practica/modal-add-alumno-practica.component';

@Component({
    selector: 'app-lista-cursos',
    templateUrl: './lista-cursos.component.html',
    styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit {
    cursos: any[];
    alumnos: any[];
    anexos: any[];
    empresasNoCurso: any[];
    empresasCurso: any[];
    cursoSeleccionado: any;
    haCambiado = false;
    user: any;
    mensaje: any;
    idUpdate: any;
    cicloFormativoSelect = new FormControl('');
    @ViewChild("selectEmpresasNoCurso") selectEmpresasNoCurso: ElementRef | undefined;

    constructor(private listaCursosService: ListaCursosService, private loginService: LoginService, private router: Router, private route: ActivatedRoute,
        private CompartirDatos: CompartirDatosService, private AnexosService: AnexosService, private cursosService: CursosService, private modal: NgbModal) {
        if (!loginService.isUserSignedIn()) {
            this.router.navigate(['/login']);
        }
        this.cursos = [];
        this.alumnos = [];
        this.anexos = [];
        this.empresasNoCurso = [];
        this.empresasCurso = [];
        this.mensaje = "";
        this.user = this.loginService.getUser();
    }

    ngOnInit(): void {
        if (this.user.rol === 'Tutor') {
            this.getMisCursos(this.user.dni);
        } else {
            this.getCursos();
        }
        this.getAnexos();

        // Si existe recojo el curso modificado para volver a el
        if (this.route.snapshot.paramMap.get('id') != null) {
            this.idUpdate = this.route.snapshot.paramMap.get('id');
            console.log('update' + this.idUpdate);
            
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
                    if (this.idUpdate) {
                        this.onChange(this.idUpdate);
                    } else {
                        this.onChange(this.cursos[0].id);
                    }
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

    // Cogemos las empresas que aun no participan en las prácticas del curso
    getEmpresasNoCurso() {
        this.empresasNoCurso = [];
        this.listaCursosService.getEmpresasNoCurso(this.cursoSeleccionado.id).subscribe(
            (response: any) => {
                let empresas = response.message;
                empresas.forEach((element: {
                    id: any; nombre: any; provincia: any; localidad: any; calle: any;
                    cp: any; cif: any; tlf: any, email: any, dniRepresentante: any, nombreRepresentante: any;
                }) => {
                    let empresa = {
                        'id': element.id,
                        'nombre': element.nombre,
                        'provincia': element.provincia,
                        'localidad': element.localidad,
                        'calle': element.calle,
                        'cp': element.cp,
                        'cif': element.cif,
                        'tlf': element.tlf,
                        'dniRepresentante': element.dniRepresentante,
                        'nombreRepresentante': element.nombreRepresentante
                    };
                    this.empresasNoCurso.push(empresa);
                });
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    // Cogemos las empresas que participan en las prácticas del curso
    getEmpresasCurso() {
        this.empresasCurso = [];
        this.listaCursosService.getEmpresasCurso(this.cursoSeleccionado.id).subscribe(
            (response: any) => {
                let empresas = response.message;
                empresas.forEach((element: {
                    id: any; nombre: any; provincia: any; localidad: any; calle: any;
                    cp: any; cif: any; tlf: any, email: any, dniRepresentante: any, nombreRepresentante: any;
                }) => {
                    let empresa = {
                        'id': element.id,
                        'nombre': element.nombre,
                        'provincia': element.provincia,
                        'localidad': element.localidad,
                        'calle': element.calle,
                        'cp': element.cp,
                        'cif': element.cif,
                        'tlf': element.tlf,
                        'dniRepresentante': element.dniRepresentante,
                        'nombreRepresentante': element.nombreRepresentante
                    };
                    this.empresasCurso.push(empresa);
                });
            },
            (error: any) => {
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
        this.getEmpresasNoCurso();
        this.getEmpresasCurso();
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
                    this.onChange(this.cursos[0].id);
                },
                (error) => {
                    console.log(error);
                }
            );
            alert("Curso eliminado.");
            this.router.navigate(['/listaCursos']);
        }
    }

    // Metodo para añadir una empresa para practicas a un curso
    addEmpresaCurso() {
        // Si el select del curso tiene valor lo añado
        if (this.selectEmpresasNoCurso) {
            let empresaId = this.selectEmpresasNoCurso.nativeElement.value;
            this.listaCursosService.addEmpresaCurso(this.cursoSeleccionado.id, empresaId).subscribe(
                (response: any) => {
                    this.onChange(this.cursos[0].id);
                },
                (error: any) => {
                    console.log(error);
                });
        }
    }


    // Metodo para eliminar una empresa para practicas en un curso
    deleteEmpresaCurso(id: any) {
        // Lo que paso por parametro es el id de la tabla que relaciona idEmpresa con idCurso

        let seguroEliminar = confirm("¿Estás seguro de que quieres eliminar esta empresa?");
        if (seguroEliminar) {
            this.listaCursosService.deleteEmpresaCurso(id).subscribe(
                (response: any) => {
                    this.onChange(this.cursos[0].id);
                },
                (error: any) => {
                    console.log(error);
                }
            );
        }
    }

    // Método que lanza un modal para añadir alumnos a las practicas en un empresa
    addAlumnoCurso() {
        let idCur = this.cursoSeleccionado.id;
        console.log('llamada modal: ' + idCur);
        
        const modalRef = this.modal.open(ModalAddAlumnoPracticaComponent);
        modalRef.componentInstance.idCur = idCur;
        modalRef.componentInstance["eventOk"].subscribe((event: any) => {
            //
        });
    }

}

