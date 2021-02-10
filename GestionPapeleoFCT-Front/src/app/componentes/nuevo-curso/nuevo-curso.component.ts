import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
    selector: 'app-nuevo-curso',
    templateUrl: './nuevo-curso.component.html',
    styleUrls: ['./nuevo-curso.component.scss']
})
export class NuevoCursoComponent implements OnInit {

    //newCurso: FormGroup;
    families: any[];
    newCurso: FormGroup | any;
    submitted = false;

    constructor(private loginService: LoginService, private router: Router, private listaCursosService: ListaCursosService, private formBuilder: FormBuilder, private cursosService: CursosService) {
        if (!loginService.isUserSignedIn()) {
            this.router.navigate(['/login']);
        }
        this.families = [];
    }

    ngOnInit(): void {
        this.getFamilies();
        this.initForm();
    }

    get form() { return this.newCurso.controls; }

    // Recogemos los datos del formulario
    onSubmit() {
        this.submitted = true;
        if (this.newCurso.invalid) {
            return;
        }
        // Creo la oferta con los datos necesarios para ser guardados en la base de datos
        let curso = this.newCurso.value;
        console.log(curso);
        this.cursosService.storeCurso(curso).subscribe(
            (response: any) => {
                this.router.navigate(['/listaCursos']);
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    // Limpiamos campos
    onReset() {
        this.submitted = false;
        this.newCurso.reset();
    }

    //Cancelo y vuelvo a la vista
    onCancel() {
        this.submitted = false;
        this.newCurso.reset();
        this.router.navigate(['/listaCursos']);
    }

    // Cogemos las familias formativas
    getFamilies() {
        this.listaCursosService.getFamilies().subscribe(
            (response: any) => {
                let families = response.message;
                families.forEach((element: {
                    familiaProfesional: any;
                }) => {
                    families
                    let family = {
                        'familiaProfesional': element.familiaProfesional
                    };
                    this.families.push(family);
                });
                console.log(this.families);
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    // Inicia el formulario
    private initForm(): void {
        this.newCurso = this.formBuilder.group({
            cicloFormativo: ['', [Validators.required]],
            cicloFormativoA: ['', [Validators.required]],
            familiaProfesional: ['', [Validators.required]],
            nHoras: ['', [Validators.required]],
            dniTutor: ['', [Validators.required]],
            cursoAcademico: ['', [Validators.required]],
        })
    }

}
