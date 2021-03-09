import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';
import { AnexosService } from 'src/app/servicios/anexos.service';
import { FctAlumnoService } from 'src/app/servicios/fct-alumno.service';
import { ResponsablesEmpresaService } from 'src/app/servicios/responsables-empresa.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-modal-add-alumno-practica',
    templateUrl: './modal-add-alumno-practica.component.html',
    styleUrls: ['./modal-add-alumno-practica.component.scss']
})
export class ModalAddAlumnoPracticaComponent implements OnInit {

    @Output() storeOk: EventEmitter<any> = new EventEmitter();
    @Input() public idCur: any;
    @Input() public idEmp: any;

    alumnosPracticas: any[];
    alumnosCurso: any[];
    responsablesCurso: any[];
    idCurso: any;
    idEmpresa: any;
    addAlumnoPracitas: FormGroup | any;
    submitted = false;
    showAdd = true;
    showUpdate = false;
    updateAlumno: any;
    datosAlumnoUpdate: any;
    habilitado = false;
    fbAlumnoOk: String;
    fbAlumnoError: String;

    constructor(public activeModal: NgbActiveModal, private adminAlumnosService: AdminAlumnosService, private formBuilder: FormBuilder,
        private fctAlumnoService: FctAlumnoService, private AnexosService: AnexosService, private responsablesEmpresaService: ResponsablesEmpresaService) {
        this.alumnosPracticas = [];
        this.alumnosCurso = [];
        this.responsablesCurso = [];
        this.fbAlumnoOk = "";
        this.fbAlumnoError = "";
    }

    ngOnInit(): void {
        this.idCurso = this.idCur;
        this.idEmpresa = this.idEmp;
        this.getResponsablesEmpresa(this.idEmpresa);
        this.getAlumnosCurso(this.idCurso);
        this.getAlumnosPracticas(this.idCurso, this.idEmpresa);
        this.initForm();
        this.updateAlumno = {
            'dniAlumno': null,
            'dniResponsable': null,
            'fechaComienzo': '',
            'fechaFin': '',
            'horarioDiario': '',
            'nHoras': '',
            'desplazamiento': null,
            'idEmpresa': ''
        };
    }

    get form() { return this.addAlumnoPracitas.controls; }


    // Método para obtener los alumnos de un curso que aun no tienen empresa para las practicas
    getAlumnosCurso(idCurso: any) {
        this.alumnosCurso = [];
        this.adminAlumnosService.getAlumnosCurso(idCurso).subscribe(
            (response: any) => {
                const alumnos = response.message;
                alumnos.forEach((element: {
                    nombre: any; apellidos: any; dniAlumno: any
                }) => {
                    let alumno = {
                        'nombre': element.nombre,
                        'apellidos': element.apellidos,
                        'dniAlumno': element.dniAlumno
                    };
                    this.alumnosCurso.push(alumno);
                });
                //console.log(this.alumnosCurso);
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    // Método para obtener los alumnos en practicas de una empresa
    getAlumnosPracticas(idCurso: any, idEmpresa: any) {
        this.alumnosPracticas = [];
        this.adminAlumnosService.getAlumnosPraticas(idCurso, idEmpresa).subscribe(
            (response: any) => {
                console.log(response.message);
                const alumnos = response.message;
                alumnos.forEach((element: { id: any; nombre: any, dni: any, apellidos: any, desplazamiento: any }) => {
                    let alumno = {
                        'id': element.id,
                        'nombre': element.nombre,
                        'apellidos': element.apellidos,
                        'dni': element.dni,
                        'desplazamiento': element.desplazamiento,
                    };
                    this.alumnosPracticas.push(alumno);
                });
            },
            (error: any) => {
                console.log(error);
            }
        );
        console.log(this.alumnosPracticas);
    }

    // Método para obtener los alumnos en practicas de una empresa
    getResponsablesEmpresa(idEmpresa: any) {
        this.responsablesCurso = [];
        this.responsablesEmpresaService.getResponsablesEmpresa(idEmpresa).subscribe(
            (response: any) => {
                console.log(response);
                const responsables = response.message;
                responsables.forEach((element: { idEmpresa: any; nombreResponsable: any, dniResponsable: any }) => {
                    let responsable = {
                        'idEmpresa': element.idEmpresa,
                        'nombreResponsable': element.nombreResponsable,
                        'dniResponsable': element.dniResponsable
                    };
                    this.responsablesCurso.push(responsable);
                });
                console.log(this.responsablesCurso);
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    // Método para obtener los datos de las practicas de un alumno
    getAlumnoFct(dniAlumno: any) {
        this.updateAlumno = [];
        this.fctAlumnoService.getAlumnoFct(dniAlumno).subscribe(
            (response: any) => {
                const res = response.message;
                res.forEach((element: { dniAlumno: any; dniResponsable: any; fechaComienzo: any; fechaFin: any; horarioDiario: any; nHoras: any; desplazamiento: any; semiPresencial: any; idEmpresa: any }) => {
                    let alumno = {
                        'dniAlumno': element.dniAlumno,
                        'dniResponsable': element.dniResponsable,
                        'fechaComienzo': element.fechaComienzo,
                        'fechaFin': element.fechaFin,
                        'horarioDiario': element.horarioDiario,
                        'nHoras': element.nHoras,
                        'desplazamiento': element.desplazamiento,
                        'semiPresencial': element.semiPresencial,
                        'idEmpresa': element.idEmpresa
                    };
                    this.updateAlumno = alumno;
                });
                // Modifico el valor de desplazamiento
                if (this.updateAlumno.desplazamiento == 0) {
                    this.updateAlumno.desplazamiento = 'No'
                } else {
                    this.updateAlumno.desplazamiento = 'Si'
                }
            },
            (error: any) => {
                console.log(error);
            }
        );
        
    }

    // Inicia el formulario
    private initForm(): void {
        this.addAlumnoPracitas = this.formBuilder.group({
            horarioDiario: ['', [Validators.required]],
            nHoras: ['', [Validators.required]],
            dniAlumno: [null, [Validators.required]],
            fechaComienzo: ['', [Validators.required]],
            fechaFin: ['', [Validators.required]],
            semiPresencial: [''],
            desplazamiento: [null, [Validators.required]],
            dniResponsable: [null, [Validators.required]],
        })
    }

    // Recogemos los datos del formulario
    onSubmit() {
        // Deshabilito el boton
        this.habilitado = true;
        this.submitted = true;
        if (this.addAlumnoPracitas.invalid) {
            return;
        }
        // Crea los datos que enviaremos
        let data = this.addAlumnoPracitas.value;
        // Leemos el desplazamiento para enviarlo        
        if (data.desplazamiento == 'Si') {
            data.desplazamiento = 1;
        } else {
            data.desplazamiento = 0;
        }
        // Leemos semipresencial
        if (data.semiPresencial) {
            data.semiPresencial = 1;
        } else {
            data.semiPresencial = 0;
        }
        // Añade mas datos necesarios
        data.idCurso = this.idCurso;
        data.idEmpresa = this.idEmpresa;

        this.fctAlumnoService.storeAlumnoPracticas(data).subscribe(
            (response: any) => {
                this.storeOk.emit(true);
                this.getAlumnosCurso(this.idCurso);
                this.getAlumnosPracticas(this.idCurso, this.idEmpresa);
                console.log(response);
                //this.activeModal.close();
                // habilito el botton
                this.habilitado = false;
                this.feedBackAlumno('Alumno añadido correctamente', 'ok');
            },
            (error: any) => {
                console.log(error);
                this.storeOk.emit(false);
                //this.activeModal.close();
                // habilito el botton
                this.habilitado = false;
                this.feedBackAlumno('Ha ocurrido un error al añadir el alumno', 'error');
            }
        );
    }

    // Método para eliminar a un alumno de las practicas
    deleteAlumnoPractica(dniAlumno: any) {
        // deshabilito el boton
        this.habilitado = true;
        this.fctAlumnoService.deleteAlumnoPractica(dniAlumno).subscribe(
            (response: any) => {
                this.storeOk.emit(true);
                this.getAlumnosCurso(this.idCurso);
                this.getAlumnosPracticas(this.idCurso, this.idEmpresa);
                //this.activeModal.close();
                // habilito el botton
                this.habilitado = false;
                // Muestro mensaje
                this.feedBackAlumno('Alumno eliminado correctamente', 'ok');
            },
            (error: any) => {
                console.log(error);
                this.storeOk.emit(false);
                //this.activeModal.close();
                // habilito el botton
                this.habilitado = false;
                this.feedBackAlumno('Ha ocurrido un error al borrar el alumno', 'error');
            }
        );
    }

    // Método que lanza los datos a la parte superior del modal para poder modificarlos posteriomente
    // en el siguiente paso
    updateAlumnoPracticaUno(alumno: any, $event: { preventDefault: () => void; }) {
        this.showAdd = false;
        this.showUpdate = true;
        this.getAlumnoFct(alumno.dni);
        this.datosAlumnoUpdate = alumno.apellidos + ', ' + alumno.nombre + ': ';

        // Modifico el formulario para los datos a modificar
        this.addAlumnoPracitas = this.formBuilder.group({
            horarioDiario: ['', [Validators.required]],
            nHoras: ['', [Validators.required]],
            dniAlumno: [null],
            fechaComienzo: ['', [Validators.required]],
            fechaFin: ['', [Validators.required]],
            semiPresencial: [''],
            desplazamiento: [''],
            dniResponsable: [''],
        })
    }

    // Método que lanza la actualización en la base de datos
    updateAlumnoPracticaDos() {
        // Deshabilito el boton
        this.habilitado = true;
        this.submitted = true;
        if (this.addAlumnoPracitas.invalid) {
            return;
        }
        // Crea los datos que enviaremos
        let data = this.addAlumnoPracitas.value;
        data.dniAlumno = this.updateAlumno.dniAlumno;
        data.idEmpresa = this.updateAlumno.idEmpresa;
        // Leemos el desplazamiento para enviarlo        
        if (data.desplazamiento == 'Si') {
            data.desplazamiento = 1;
        } else {
            data.desplazamiento = 0;
        }

        this.fctAlumnoService.updateAlumnoFct(data).subscribe(
            (response: any) => {
                console.log(response);
                // habilito el botton
                this.habilitado = false;
                this.feedBackAlumno('Alumno modificado correctamente', 'ok');
            },
            (error: any) => {
                console.log(error);
                // habilito el botton
                this.habilitado = false;
                this.feedBackAlumno('Ha ocurrido un erro al modificar el alumno', 'error');
            }
        );
        this.onReset();
    }

    // Método para ver un mensaje al añadir, modificar o eliminar alumno
    feedBackAlumno(mensaje: any, status: any) {
        if (status == 'ok') {
            this.fbAlumnoOk = mensaje;
            setTimeout(() => {
                this.fbAlumnoOk = '';
            }, 2000);
        } else {
            this.fbAlumnoError = mensaje;
            setTimeout(() => {
                this.fbAlumnoError = '';
            }, 2000);
        }
    }

    //--ANEXOS
    anexo3(alumno: any) {
        var datos = {
            'idAlumno': alumno.id,
            'idEmpresa': this.idEmpresa,
            'idCurso': this.idCurso
        }
        this.AnexosService.anexo3(datos).subscribe(
            (response: any) => {
                console.log(response);
                let enlace = environment.dirBack2 + 'descargar/' + response.message;
                window.open(enlace, '_blank');
            }, (error) => {
                console.log(error);
            }
        );
    }

    // Método para cancelar la modificación de unas practicas
    onReset() {
        this.submitted = false;
        this.showAdd = true;
        this.showUpdate = false;
        // Reinicio el formulario
        this.initForm();
    }


    anexo4(alumno: any) {
        var datos = {
            'idAlumno': alumno.id,
            'idEmpresa': this.idEmpresa,
            'idCurso': this.idCurso
        }
        this.AnexosService.anexo4(datos).subscribe(
            (response: any) => {
                console.log(response);
                let enlace = environment.dirBack2 + 'descargar/' + response.message;
                window.open(enlace, '_blank');
            }, (error) => {
                console.log(error);
            }
        );
    }

    anexo5(alumno: any) {
        var datos = {
            'idAlumno': alumno.id,
            'idEmpresa': this.idEmpresa,
            'idCurso': this.idCurso
        }
        this.AnexosService.anexo5(datos).subscribe(
            (response: any) => {
                console.log(response);
                let enlace = environment.dirBack2 + 'descargar/' + response.message;
                window.open(enlace, '_blank');
            }, (error) => {
                console.log(error);
            }
        );
    }

    anexo7(alumno: any) {
        /* var datos = {
        }
        this.AnexosService.anexo7(datos).subscribe(
            (response: any) => {
                console.log(response);
                let enlace = environment.dirBack2 + 'descargar/' + response.message;
                window.open(enlace, '_blank');
            }, (error) => {
                console.log(error);
            }
        ); */
    }

    cerrarModal(){
        this.storeOk.emit(true);
        this.activeModal.close();
    }

}

