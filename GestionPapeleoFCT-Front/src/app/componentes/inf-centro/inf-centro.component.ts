import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminCentroService } from 'src/app/servicios/admin-centro.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-inf-centro',
  templateUrl: './inf-centro.component.html',
  styleUrls: ['./inf-centro.component.scss']
})

export class InfCentroComponent implements OnInit {
  centro: any;
  nuevoRegistro: FormGroup;
  submitted = false;
  message: any;
  director: any;
  user: any;

  constructor(private LoginService:LoginService, private AdminCentroService: AdminCentroService, private formBuilder: FormBuilder, private router: Router) {
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
    this.message = "";
    this.centro =({
      codigo:'',
      nombre: '',
      provincia:'',
      localidad:'',
      calle:'',
      cp:'',
      cif:'',
      tlf:'',
      email:''
    });

    this.director=({
      nombre: '',
      email: ''
    });
  }

  ngOnInit(): void {
    this.IsCentr();
    this.getDirector();
  }

  IsCentr(){
    this.AdminCentroService.getCentro().subscribe(
      (response: any) => { 
        console.log(response);
        this.centro = response.message.centro;
        console.log(this.centro);
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }
  getDirector(){
    this.AdminCentroService.getDirector().subscribe(
      (response: any) => { 
        console.log(response);
        this.director.nombre = response.message.nombre;
        this.director.email = response.message.email;
        console.log(this.centro);
      },
      (error) => {
        this.message = error.error.message;
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

    console.log(datosCentro);
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
        console.log(response);
        this.message = "Registro correcto";
        this.router.navigate(['/infCentro']);
      },
      (error) => {
        this.message = error.error.message;
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
