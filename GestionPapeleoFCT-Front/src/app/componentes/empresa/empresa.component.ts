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
  nuevoResp: any;
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
      console.log(this.empresa);
      this.nuevoResp = {
        'idEmpresa': this.empresa.id,
        'dni': '',
        'nombre': ''
      }
    }

    //Formulario 'editar empresa'
    this.editarEmpresa = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      cif: ['', [Validators.required]],
      tlf: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      dniRepresentante: ['', [Validators.required, Validators.pattern]],
      nombreRepresentante: ['', [Validators.required]],
      dniNuevo: ['', [Validators.required, Validators.pattern]],
      nombreNuevo: ['', [Validators.required]]
    });

    this.editarEmpresa?.disable();

    this.textoBoton = "Editar";
  }

  ngOnInit(): void {
  }

  get formulario() { return this.editarEmpresa.controls; }


  //Actualiza la empresa
  actualizar() {
    this.editarEmpresa.get('dniNuevo')?.disable();
    this.editarEmpresa.get('nombreNuevo')?.disable();
    this.submitted = true;
    if (this.editarEmpresa.invalid) {
      return
    } else {
      this.adminEmpresasService.updateEmpresa(this.empresa).subscribe(
        (response: any) => {
          this.activarEdicion();
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = this.empresa.nombre + ' actualizada correctamente';
          modalRef.componentInstance.exito = true;

          this.CompartirDatos.setEmpresa(this.empresa);
          this.submitted = false;
          this.editarEmpresa.get('dniNuevo')?.markAsUntouched();  //Evita errores de validación cuando no hacen falta
          this.editarEmpresa.get('nombreNuevo')?.markAsUntouched(); //Evita errores de validación cuando no hacen falta
          this.router.navigate(['/empresa']);
        },
        (error) => {
          console.log(error);
          const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
          modalRef.componentInstance.mensaje = 'Ha ocurrido un error al actualizar la empresa ' + this.empresa.nombre;
          modalRef.componentInstance.exito = false;
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
      const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
      modalRef.componentInstance.mensaje = 'Empresa ' + this.empresa.nombre + ' eliminada correctamente';
      modalRef.componentInstance.exito = true;
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
      this.textoBoton = "Dejar de editar";
    } else {
      this.editarEmpresa?.disable();
      this.activados = false;
      this.textoBoton = "Editar";
    }
  }

  /**
   * Añade un nuevo responsable a la empresa
   */
  addResp() {
    this.submitted = true;
    this.adminEmpresasService.addResponsable(this.nuevoResp).subscribe(
      (response: any) => {
        this.submitted = false;
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = this.nuevoResp.nombre + ' añadido correctamente';
        modalRef.componentInstance.exito = true;

        //Actualiza la lista
        let responsable = {
          'dniResponsable': this.nuevoResp.dni,
          'nombreResponsable': this.nuevoResp.nombre
        }

        //"Limpia" los campos de nuevo responsable
        this.nuevoResp.dni = '';
        this.nuevoResp.nombre = '';

        //Actualiza la empresa
        this.empresa.responsables.push(responsable);
        this.CompartirDatos.setEmpresa(this.empresa);
        this.editarEmpresa.get('dniNuevo')?.markAsUntouched();  //Evita errores de validación cuando no hacen falta
        this.editarEmpresa.get('nombreNuevo')?.markAsUntouched(); //Evita errores de validación cuando no hacen falta
        this.router.navigate(['/empresa']);
      },
      (error) => {
        console.log(error);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un error al añadir a ' + this.nuevoResp.nombre + ' como responsable';
        modalRef.componentInstance.exito = false;
      }
    );
  }

  /**
   * Elimina un responsable de empresa
   * @param responsable 
   */
  eliminarResponsable(dniResponsable: any) {

    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = '¿Estás seguro de que quieres eliminar este responsable de la base de datos?';
    modalRef.componentInstance["storeOk"].subscribe((event: any) => {
      this.adminEmpresasService.deleteResponsable(dniResponsable).subscribe(
        (response: any) => {
          alert('Responsable eliminado');
  
          //Elimina el responsable de la lista
          for (let index = 0; index < this.empresa.responsables.length; index++) {
            if (this.empresa.responsables[index].dniResponsable == dniResponsable) {
              this.empresa.responsables.splice(index, 1);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });

    
  }

}
