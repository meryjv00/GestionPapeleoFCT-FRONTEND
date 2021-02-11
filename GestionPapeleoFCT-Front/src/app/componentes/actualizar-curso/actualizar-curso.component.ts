import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-actualizar-curso',
  templateUrl: './actualizar-curso.component.html',
  styleUrls: ['./actualizar-curso.component.scss']
})
export class ActualizarCursoComponent implements OnInit {

  families: any[];
  newCurso: FormGroup | any;
  submitted = false;
  curso: any;

  constructor(private loginService: LoginService, private router: Router, private listaCursosService: ListaCursosService, private formBuilder: FormBuilder, private cursosService: CursosService, private compartirDatos: CompartirDatosService) {
    if (!loginService.isUserSignedIn()) {
      this.router.navigate(['/login']);
    }
    this.families = [];
  }

  ngOnInit(): void {
    this.getFamilies();
    this.initForm();
    this.curso = this.compartirDatos.getCurso();
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
    curso.id = this.curso.id;
    this.cursosService.updateCurso(curso).subscribe(
      (response: any) => {
        this.router.navigate(['/listaCursos', {id:JSON.stringify(this.curso.id)}]);
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
