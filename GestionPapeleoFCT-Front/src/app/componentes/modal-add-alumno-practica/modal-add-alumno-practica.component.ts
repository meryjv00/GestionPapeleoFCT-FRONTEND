import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';

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

    constructor(public activeModal: NgbActiveModal, private adminAlumnosService: AdminAlumnosService) {
        this.alumnosPracticas = [];
        this.alumnosCurso = [];
    }

    ngOnInit(): void {
        this.idCurso = this.idCur;
        this.idEmpresa = this.idEmp;        
        this.getAlumnosCurso(this.idCurso);
        this.getAlumnosPracticas(this.idCurso, this.idEmpresa);
    }

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
                console.log(response);
                // const alumnos = response;
                // alumnos.forEach((element: { id: any; description: any }) => {
                //     let alumno = {
                //         'id': element.id,
                //         'description': element.description
                //     };
                //     this.alumnosCurso.push(alumno);
                // });
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
                console.log(response);
                // const alumnos = response;
                // alumnos.forEach((element: { id: any; description: any }) => {
                //     let alumno = {
                //         'id': element.id,
                //         'description': element.description
                //     };
                //     this.alumnosCurso.push(alumno);
                // });
            },
            (error: any) => {
                console.log(error);
            }
        );
    }


}

