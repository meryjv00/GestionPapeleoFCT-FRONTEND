import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';
import { AnexosService } from 'src/app/servicios/anexos.service';
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { FctAlumnoService } from 'src/app/servicios/fct-alumno.service';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';
import { LoginService } from 'src/app/servicios/login.service';
import { environment } from 'src/environments/environment';
import { ActualizarCursoComponent } from '../actualizar-curso/actualizar-curso.component';
import { AlumnoComponent } from '../alumno/alumno.component';
import { ModalAddAlumnoPracticaComponent } from '../modal-add-alumno-practica/modal-add-alumno-practica.component';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { ModalFotoAlumnoComponent } from '../modal-foto-alumno/modal-foto-alumno.component';
import { NuevoAlumnoComponent } from '../nuevo-alumno/nuevo-alumno.component';
import { NuevoCursoComponent } from '../nuevo-curso/nuevo-curso.component';

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
    countAlumnosPracticas: any[];
    cursoSeleccionado: any;
    haCambiado = false;
    user: any;
    mensaje: any;
    idUpdate: any;
    cicloFormativoSelect = new FormControl('');
    @ViewChild("selectEmpresasNoCurso") selectEmpresasNoCurso: ElementRef | undefined;
    habilitado = false;

    constructor(private listaCursosService: ListaCursosService, private loginService: LoginService, private router: Router, private route: ActivatedRoute,
        private CompartirDatos: CompartirDatosService, private AnexosService: AnexosService, private cursosService: CursosService,
        private modal: NgbModal, private adminAlumnosService: AdminAlumnosService, private fctAlumnoService: FctAlumnoService) {
        if (!loginService.isUserSignedIn()) {
            this.router.navigate(['/login']);
        }
        this.cursos = [];
        this.alumnos = [];
        this.anexos = [];
        this.empresasNoCurso = [];
        this.empresasCurso = [];
        this.countAlumnosPracticas = [];
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
                    id: any; familiaProfesional: any; cicloFormativo: any; cicloFormativoA: any;
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
                        id: any; familiaProfesional: any; cicloFormativo: any; cicloFormativoA: any;
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
                    var foto;
                    // Foto al azar
                    if (alumn0.foto == 0) {
                        var az = Math.round(Math.random() * 7) + 1;
                        foto = environment.dirBack2 + "IMG/" + az + ".jpg";
                    } else { // Su foto
                        foto = environment.dirBack2 + "IMG/" + alumn0.dni + ".png";
                    }
                    let alumno = {
                        'id': alumn0.id,
                        'dni': alumn0.dni,
                        'nombre': alumn0.nombre,
                        'apellidos': alumn0.apellidos,
                        'localidad': alumn0.localidad,
                        'residencia': alumn0.residencia,
                        'correo': alumn0.correo,
                        'telefono': alumn0.tlf,
                        'foto': foto
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
                    idEmpresa: any; nombre: any; provincia: any; localidad: any; calle: any;
                    cp: any; cif: any; tlf: any, email: any, dniRepresentante: any, nombreRepresentante: any;
                }) => {
                    let empresa = {
                        'id': element.idEmpresa,
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

    // Método para obtener los alumnos en practicas por empresas dentro de un curso
    getCountAlumnosPracticas() {
        this.countAlumnosPracticas = [];
        this.fctAlumnoService.getCountAlumnosPracticas(this.cursoSeleccionado.id).subscribe(
            (response: any) => {
                let alumnos = response.message;
                alumnos.forEach((element: {
                    idEmpresa: any; alumnos: any;
                }) => {
                    let alumno = {
                        'id': element.idEmpresa,
                        'alumnos': element.alumnos
                    };
                    this.countAlumnosPracticas.push(alumno);
                });
                console.log(this.countAlumnosPracticas);

            },
            (error: any) => {
                console.log(error);
            }
        );
        console.log(this.countAlumnosPracticas);

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
        this.getCountAlumnosPracticas();
    }

    /**
     * Vamos a la vista añadir alumno pasandole los datos del curso 
     * mediante un servicio para recuperarla en el componente nuevo alumno
     */
    addAlumno() {
        const modalRef = this.modal.open(NuevoAlumnoComponent, { size: 'lg' });
        modalRef.componentInstance.cursoSeleccionado = this.cursoSeleccionado;
        modalRef.componentInstance.alumnos = this.alumnos;
    }

    /**
    * Vamos a la vista actualizar alumno pasandole los datos del alumno seleccionado 
    * mediante un servicio para recuperarla en el componente alumno
    */
    updateAlumno(alumno: any) {
        const modalRef = this.modal.open(AlumnoComponent, { size: 'lg' });
        modalRef.componentInstance.cursoSeleccionado = this.cursoSeleccionado;
        modalRef.componentInstance.alumno = alumno;
        modalRef.componentInstance.alumnos = this.alumnos;
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
        const modalRef = this.modal.open(NuevoCursoComponent, { size: 'lg' });
        modalRef.componentInstance.cursoSeleccionado = this.cursoSeleccionado;
        modalRef.componentInstance.cursos = this.cursos;
    }

    // Método para modificar un curso
    updateCurso(curso: any) {
        const modalRef = this.modal.open(ActualizarCursoComponent, { size: 'lg' });
        modalRef.componentInstance.curso = curso;
        modalRef.componentInstance.cursoSeleccionado = this.cursoSeleccionado;
    }

    // Método para eliminar un curso
    deleteCurso() {
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres eliminar el curso ' + this.cursoSeleccionado.cicloFormativoA + ' de la Base de Datos?';
        modalRef.componentInstance["storeOk"].subscribe((event: any) => {
            //Eliminar curso BD
            this.cursosService.deleteCurso(this.cursoSeleccionado.id).subscribe(
                (response: any) => {
                    this.cursos.forEach((curso, index) => {
                        if (curso.id == this.cursoSeleccionado.id) {
                            this.cursos.splice(index, 1);
                        }
                    });
                    this.cursoSeleccionado = this.cursos[0];
                    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
                    modalRef.componentInstance.mensaje = 'Curso eliminado correctamente';
                    modalRef.componentInstance.exito = true;
                },
                (error) => {
                    console.log(error);
                    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
                    modalRef.componentInstance.mensaje = 'Ha ocurrido un error al eliminar el curso';
                    modalRef.componentInstance.exito = false;
                }
            );
        });
    }

    // Metodo para añadir una empresa para practicas a un curso
    addEmpresaCurso() {
        // Si el select del curso tiene valor lo añado
        if (this.selectEmpresasNoCurso) {
            let empresaId = this.selectEmpresasNoCurso.nativeElement.value;
            this.listaCursosService.addEmpresaCurso(this.cursoSeleccionado.id, empresaId).subscribe(
                (response: any) => {
                    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
                    modalRef.componentInstance.mensaje = 'Empresa añadida correctamente';
                    modalRef.componentInstance.exito = true;
                    this.onChange(this.cursoSeleccionado.id);
                    // habilito el botton
                    this.habilitado = false;
                },
                (error: any) => {
                    console.log(error);
                    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
                    modalRef.componentInstance.mensaje = 'No se ha podido añadir la empresa';
                    modalRef.componentInstance.exito = false;
                    // habilito el botton
                    this.habilitado = false;
                });
        }
    }

    // Metodo para eliminar una empresa para practicas en un curso
    deleteEmpresaCurso(idEmpresa: any) {
        // Lo que paso por parametro es el id de la tabla que relaciona idEmpresa con idCurso
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres eliminar esta empresa?';
        modalRef.componentInstance["storeOk"].subscribe((event: any) => {
            this.listaCursosService.deleteEmpresaCurso(idEmpresa, this.cursoSeleccionado.id).subscribe(
                (response: any) => {
                    this.onChange(this.cursoSeleccionado.id);
                    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
                    modalRef.componentInstance.mensaje = 'Empresa eliminada con exito';
                    modalRef.componentInstance.exito = true;
                },
                (error: any) => {
                    console.log(error);
                    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
                    modalRef.componentInstance.mensaje = 'Ha ocurrido un error al eliminar la empresa';
                    modalRef.componentInstance.exito = false;
                }
            );
        });
    }

    // Método que lanza un modal para añadir alumnos a las practicas en un empresa
    addAlumnoCurso(idEmpresa: any) {
        let idEmp = idEmpresa;
        let idCur = this.cursoSeleccionado.id;
        let nombreRes = this.cursoSeleccionado.nombreRepresentante;
        const modalRef = this.modal.open(ModalAddAlumnoPracticaComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.idCur = idCur;
        modalRef.componentInstance.idEmp = idEmp;
        modalRef.componentInstance["storeOk"].subscribe((event: any) => {
            this.getCountAlumnosPracticas();
        });
    }

    deleteAlumno(alumno: any) {
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres eliminar a ' + alumno.nombre + ' ' + alumno.apellidos + ' de la base de datos?';
        modalRef.componentInstance["storeOk"].subscribe((event: any) => {
            this.adminAlumnosService.deleteAlumno(alumno).subscribe(
                (response: any) => {
                    this.alumnos.forEach((alumnoA, index) => {
                        if (alumno.id == alumnoA.id) {
                            this.alumnos.splice(index, 1);
                        }
                    });
                    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
                    modalRef.componentInstance.mensaje = 'Alumno eliminado correctamente';
                    modalRef.componentInstance.exito = true;
                },
                (error) => {
                    console.log(error);
                    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
                    modalRef.componentInstance.mensaje = 'Ha ocurrido un error al eliminar el alumno';
                    modalRef.componentInstance.exito = false;
                }
            );
        });
    }

    updateFoto(alumno: any) {
        const modalRef = this.modal.open(ModalFotoAlumnoComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.alumno = alumno;
        modalRef.componentInstance["storeOk"].subscribe((event: any) => {
            const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
            modalRef.componentInstance.mensaje = `Foto de ${alumno.nombre}  ${alumno.apellidos} actualizada correctamente`;
            modalRef.componentInstance.exito = true;
        });
    }


    //--ANEXOS
    /**
 * Manda generar el anexo 0 con el servicio 'anexos' y lo manda descargar
 * redirigiendo a la url donde se encuentra el archivo
 * @param empresa 
 */
    anexo0(empresa: any) {
        this.AnexosService.anexo0(empresa).subscribe(
            (response: any) => {
                console.log(response);
                let enlace = environment.dirBack2 + 'descargar/' + response.message;
                window.open(enlace, '_blank');
            }, (error) => {
                console.log(error);
            }
        );
    }

    anexo1(empresa: any) {
        var datos = {
            'idEmpresa': empresa.id,
            'idCurso': this.cursoSeleccionado.id
        }
        this.AnexosService.anexo1(datos).subscribe(
            (response: any) => {
                console.log(response);
                let enlace = environment.dirBack2 + 'descargar/' + response.message;
                window.open(enlace, '_blank');
            }, (error) => {
                console.log(error);
            }
        );
    }

    anexo2(empresa: any) {
        var datos = {
            'idEmpresa': empresa.id,
            'idCurso': this.cursoSeleccionado.id
        }
        this.AnexosService.anexo2(datos).subscribe(
            (response: any) => {
                console.log(response);
                let enlace = environment.dirBack2 + 'descargar/' + response.message;
                window.open(enlace, '_blank');
            }, (error) => {
                console.log(error);
            }
        );
    }

    anexo6() {
        var datos = {
            'idCurso': this.cursoSeleccionado.id
        }
        this.AnexosService.anexo6(datos).subscribe(
            (response: any) => {
                console.log(response);
                let enlace = environment.dirBack2 + 'descargar/' + response.message;
                window.open(enlace, '_blank');
            }, (error) => {
                console.log(error);
            }
        );
    }

    anexo7() {
        var datos = {
            'idCurso': this.cursoSeleccionado.id
        }
        this.AnexosService.anexo7(datos).subscribe(
            (response: any) => {
                console.log(response);
                let enlace = environment.dirBack2 + 'descargar/' + response.message;
                window.open(enlace, '_blank');
            }, (error) => {
                console.log(error);
            }
        );
    }

}