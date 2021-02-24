import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminEmpresasService } from 'src/app/servicios/admin-empresas.service';
import { LoginService } from 'src/app/servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  empresa: any;
  editarEmpresa: FormGroup;
  submitted = false;
  activados = false;
  textoBoton: any;

  constructor(private router: Router, private loginService: LoginService, private adminEmpresasService: AdminEmpresasService, private formBuilder: FormBuilder,
    private CompartirDatos: CompartirDatosService, private modal: NgbModal) {
    if (!loginService.isUserSignedIn()) {
      this.router.navigate(['/login']);
    }

    //Carga la empresa a mostrar
    if (!this.CompartirDatos.getEmpresa()) {
      //Error en la carga de la empresa
      this.router.navigate(['/listaEmpresas']);
    } else {
      this.empresa = this.CompartirDatos.getEmpresa();
    }

    //Formulario 'editar empresa'
    this.editarEmpresa = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength]],
      provincia: ['', [Validators.required, Validators.minLength]],
      localidad: ['', [Validators.required, Validators.minLength]],
      calle: ['', [Validators.required, Validators.minLength]],
      cp: ['', [Validators.required, Validators.minLength]],
      cif: ['', [Validators.required, Validators.minLength]],
      tlf: ['', [Validators.required, Validators.minLength]],
      email: ['', [Validators.required, Validators.minLength]],
      dniRepresentante: ['', [Validators.required]],
      nombreRepresentante: ['', [Validators.required]]
    });

    this.editarEmpresa?.disable();

    this.textoBoton = "Editar";
  }

  ngOnInit(): void {
  }

  get formulario() { return this.editarEmpresa.controls; }

  //Actualiza la empresa
  actualizar() {
    this.submitted = true;
    if (this.editarEmpresa.invalid) {
      return
    } else {
      this.adminEmpresasService.updateEmpresa(this.empresa).subscribe(
        (response: any) => {
          this.activarEdicion();
          alert('Empresa actualizada');
          this.CompartirDatos.setEmpresa(this.empresa);
          this.router.navigate(['/empresa']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  /**
   * Pide confirmación y llama a eliminarla.
   * @param empresa 
   */
  eliminarEmpresa() {
    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres eliminar esta empresa de la base de datos?';
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.adminEmpresasService.deleteEmpresaSuscription(this.empresa.id);
      alert("Empresa eliminada.");
      this.router.navigate(['/listaEmpresas']);
    });

  }

  /**
   * Activa los inputs del formulario para editarlos o en caso de que esten 
   * activados los desactiva
   */
  activarEdicion() {
    if (!this.activados) {
      this.editarEmpresa?.enable();
      this.activados = true;
      this.textoBoton = "Cancelar";
    } else {
      this.editarEmpresa?.disable();
      this.activados = false;
      this.textoBoton = "Editar";
    }
  }

}
