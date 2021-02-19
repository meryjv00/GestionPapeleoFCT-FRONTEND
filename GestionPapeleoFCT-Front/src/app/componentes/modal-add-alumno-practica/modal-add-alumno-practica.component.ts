import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';
import { FctAlumnoService } from 'src/app/servicios/fct-alumno.service';

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
    idCurso: any;
    idEmpresa: any;
    addAlumnoPracitas: FormGroup | any;
    submitted: false;

    constructor(public activeModal: NgbActiveModal, private adminAlumnosService: AdminAlumnosService, private formBuilder: FormBuilder, private fctAlumnoService: FctAlumnoService) {
        this.alumnosPracticas = [];
        this.alumnosCurso = [];
    }

    ngOnInit(): void {
        this.idCurso = this.idCur;
        this.idEmpresa = this.idEmp;
        this.getAlumnosCurso(this.idCurso);
        this.getAlumnosPracticas(this.idCurso, this.idEmpresa);
        this.initForm();
    }

    get form() { return this.addAlumnoPracitas.controls; }


    // Método para añadir un alumno de las practicas de una empresa
    addAlumnoPracticas() {

    }

    // Método para eliminar un alumno de las practicas
    deleteAlumnoPracticas() {

    }

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
                console.log(this.alumnosCurso);

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
                const alumnos = response.message;
                alumnos.forEach((element: { id: any; nombre: any, dni: any }) => {
                    let alumno = {
                        'id': element.id,
                        'nombre': element.nombre,
                        'dni': element.dni
                    };
                    this.alumnosPracticas.push(alumno);
                });
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
        })
    }

    // Recogemos los datos del formulario
    onSubmit() {
        this.submitted = true;
        if (this.addAlumnoPracitas.invalid) {
            return;
        }
        let data = this.addAlumnoPracitas.value;
        data.idCurso = this.idCurso;
        data.idEmpresa = this.idEmpresa;

        this.fctAlumnoService.storeAlumnoPracticas(data).subscribe(
            (response: any) => {
                this.storeOk.emit(true);
                this.getAlumnosCurso(this.idCurso);
                this.getAlumnosPracticas(this.idCurso, this.idEmpresa);
                //this.activeModal.close();
            },
            (error: any) => {
                console.log(error);
                this.storeOk.emit(false);
                //this.activeModal.close();
            }
        );
    }

    // Método para eliminar a un alumno de las practicas
    deleteAlumnoPractica(dniAlumno: any) {

        this.fctAlumnoService.deleteAlumnoPractica(dniAlumno).subscribe(
            (response: any) => {
                console.log(response);
                
                this.storeOk.emit(true);
                this.getAlumnosCurso(this.idCurso);
                this.getAlumnosPracticas(this.idCurso, this.idEmpresa);
                //this.activeModal.close();
            },
            (error: any) => {
                console.log(error);
                this.storeOk.emit(false);
                //this.activeModal.close();
            }
        );

    }



}

