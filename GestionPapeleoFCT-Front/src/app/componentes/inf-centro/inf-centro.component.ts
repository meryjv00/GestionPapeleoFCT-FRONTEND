import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminCentroService } from 'src/app/servicios/admin-centro.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';

@Component({
  selector: 'app-inf-centro',
  templateUrl: './inf-centro.component.html',
  styleUrls: ['./inf-centro.component.scss']
})

export class InfCentroComponent implements OnInit {
  centro: any;
  nuevoRegistro: FormGroup;
  submitted = false;
  director: any;
  user: any;

  constructor(private LoginService: LoginService, private AdminCentroService: AdminCentroService, private formBuilder: FormBuilder,
    private router: Router, private modal: NgbModal) {
    this.user = this.LoginService.getUser();
    this.nuevoRegistro = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      cif: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tlf: ['', [Validators.required]],
    });
    this.centro = ({
      codigo: '',
      nombre: '',
      provincia: '',
      localidad: '',
      calle: '',
      cp: '',
      cif: '',
      tlf: '',
      email: ''
    });

    this.director = ({
      nombre: '',
      email: ''
    });
  }

  ngOnInit(): void {
    this.IsCentr();
    this.getDirector();
  }

  IsCentr() {
    this.AdminCentroService.getCentro().subscribe(
      (response: any) => {
        this.centro = response.message.centro;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  getDirector() {
    this.AdminCentroService.getDirector().subscribe(
      (response: any) => {
        this.director.nombre = response.message.nombre;
        this.director.email = response.message.email;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  get formulario() { return this.nuevoRegistro.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.nuevoRegistro.invalid) {
      return;
    }
    let datosCentro = this.nuevoRegistro.value;

    const codigo = datosCentro.codigo;
    const cif = datosCentro.cif;
    const nombre = datosCentro.nombre;
    const provincia = datosCentro.provincia;
    const localidad = datosCentro.localidad;
    const cp = datosCentro.cp;
    const calle = datosCentro.calle;
    const email = datosCentro.email;
    const tlf = datosCentro.tlf;
    this.AdminCentroService.updateCentro(codigo, cif, nombre, provincia, localidad, cp, calle, email, tlf).subscribe(
      (response: any) => {
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Datos del centro actualizados correctamente';
        modalRef.componentInstance.exito = true;
      },
      (error) => {
        console.log(error.message);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
        modalRef.componentInstance.mensaje = 'Ha ocurrido un error al actualizar el centro';
        modalRef.componentInstance.exito = false;
      }
    );
    this.onReset();
    this.IsCentr();
  }

  onReset() {
    this.submitted = false;
    this.nuevoRegistro.reset();
  }

}
