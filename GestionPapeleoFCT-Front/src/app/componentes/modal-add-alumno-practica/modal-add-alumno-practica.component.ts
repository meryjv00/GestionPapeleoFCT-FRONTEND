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

    alumnosPracticas: any[];
    alumnosCurso: any[];
    idCurso: any;

    constructor(public activeModal: NgbActiveModal, private adminAlumnosService: AdminAlumnosService) {
        this.alumnosPracticas = [];
        this.alumnosCurso = [];
    }

    ngOnInit(): void {
        this.getAlumnosPracticas();
        this.getAlumnosCurso(this.idCurso);
        this.idCurso = this.idCur;
        console.log(this.idCurso);
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
                const alumnos = response;
                alumnos.forEach((element: { id: any; description: any }) => {
                    let alumno = {
                        'id': element.id,
                        'description': element.description
                    };
                    this.alumnosCurso.push(alumno);
                });
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    // Método para obtener los alumnos en practicas de una empresa
    getAlumnosPracticas() {

    }


}

