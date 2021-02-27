import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArrayUsService } from 'src/app/servicios/array-us.service';
import { IsPersonaService } from 'src/app/servicios/is-persona.service'
import { RegistroService } from 'src/app/servicios/registro.service';

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.scss']
})
export class RegistroPersonaComponent implements OnInit {
  nuevoRegistro: FormGroup;
  submitted = false;
  persona: any;
  rolSeleccionado: any;
  mensaje: any;
  constructor(private ArrayUsService: ArrayUsService,private IsPersonaService: IsPersonaService, private formBuilder: FormBuilder, private router: Router,private RegistroService: RegistroService) {
    this.nuevoRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required,Validators.pattern]],
      apellidos: ['', [Validators.required,Validators.pattern]],
      localidad: ['', [Validators.required,Validators.minLength]],
      residencia: ['', [Validators.required,Validators.minLength]],
      correo: ['', [Validators.required,Validators.email]],
      tlf: ['', [Validators.required,Validators.pattern]]
    });
    this.persona = {
      nombre:'',
      apellidos: '',
      localidad:'',
      residencia:'',
      correo: '',
      tlf:'' 
    };
  }
  ngOnInit(): void {
    this.IsPer(this.ArrayUsService.getDni());
  }

  IsPer(dni: string) {
    this.IsPersonaService.existePersona(dni).subscribe(
      (response: any) => { 
        console.log(response.message);
        if(response.message.persona != null){
          this.persona = response.message.persona;
        } 
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
  get formulario() { return this.nuevoRegistro.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.nuevoRegistro.invalid) {
      return;
    }
    if(!this.rolSeleccionado){
      this.mensaje = "Seleccione un rol, porfavor";
      return;
    }
    let datosUsuario = this.nuevoRegistro.value;
    const email = this.ArrayUsService.getEmail();
    const dni = this.ArrayUsService.getDni();
    const nombre = datosUsuario.nombre;
    const apellidos = datosUsuario.apellidos;
    const localidad = datosUsuario.localidad;
    const residencia = datosUsuario.residencia;
    const correo = datosUsuario.correo;
    const tlf = datosUsuario.tlf;
    const rol = this.rolSeleccionado;
    this.registro(email, dni, nombre, apellidos, localidad, residencia,correo, tlf,rol);
    this.onReset(); 
  }

  registro(email: any, dni: any, nombre: any, apellidos: any, localidad: any, residencia: any, correo:any, tlf: any, rol:any) {
    this.RegistroService.RegistroPersona(email, dni, nombre, apellidos, localidad, residencia,correo, tlf,rol).subscribe(
      (response: any) => {
        console.log(response);
        console.log("Registro correcto");
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error.error.message);
      }
    );

  }
  onReset() {
    this.submitted = false;
    this.nuevoRegistro.reset();
  }

  cancel() {
    this.onReset();
  }

  onChange(idRol: any){
    console.log(idRol);
    this.rolSeleccionado = idRol;
  }
}