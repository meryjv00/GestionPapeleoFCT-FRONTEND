import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ListaCursosService } from 'src/app/servicios/lista-cursos.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';

@Component({
  selector: 'app-actualizar-curso',
  templateUrl: './actualizar-curso.component.html',
  styleUrls: ['./actualizar-curso.component.scss']
})
export class ActualizarCursoComponent implements OnInit {

  @Input() public curso: any;
  @Input() public cursoSeleccionado: any;
  families: any[];
  newCurso: FormGroup | any;
  submitted = false;
  cursoU: any;

  constructor(private loginService: LoginService, private router: Router, private listaCursosService: ListaCursosService, private formBuilder: FormBuilder, private cursosService: CursosService,
    private compartirDatos: CompartirDatosService, private modal: NgbModal, public activeModal: NgbActiveModal) {
    if (!loginService.isUserSignedIn()) {
      this.router.navigate(['/login']);
    }
    this.families = [];

  }

  ngOnInit(): void {
    this.getFamilies();
    this.initForm();
    this.cursoU = { ...this.curso };

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
    console.log(curso);
    this.cursosService.updateCurso(curso).subscribe(
      (response: any) => {
        // Actualizo el curso en local
        this.cursoSeleccionado.familiaProfesional = curso.familiaProfesional;
        this.cursoSeleccionado.cicloFormativo = curso.cicloFormativo;
        this.cursoSeleccionado.cicloFormativoA = curso.cicloFormativoA;
        this.cursoSeleccionado.cursoAcademico = curso.cursoAcademico;
        this.cursoSeleccionado.nHoras = curso.nHoras;

        this.activeModal.close();
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = curso.cicloFormativoA + ' actualizado correctamente';
        modalRef.componentInstance.exito = true;
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
    this.activeModal.close();
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
      cursoAcademico: ['', [Validators.required]],
    })
  }

}
