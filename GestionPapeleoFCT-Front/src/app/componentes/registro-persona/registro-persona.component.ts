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

  constructor(private ArrayUsService: ArrayUsService,private IsPersonaService: IsPersonaService, private formBuilder: FormBuilder, private router: Router,private RegistroService: RegistroService) {
    this.nuevoRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      residencia: ['', [Validators.required]],
      tlf: ['', [Validators.required]],
      rol: ['', [Validators.required]]
    });
    this.persona = {
      nombre:'',
      apellidos: '',
      localidad:'',
      residencia:'',
      tlf:'' 
    };
  }
  ngOnInit(): void {
    this.IsPer(this.ArrayUsService.getDni());
  }

  IsPer(dni: string) {
    this.IsPersonaService.existePersona(dni).subscribe(
      (response: any) => { 
        //console.log(response.message);
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

    let datosUsuario = this.nuevoRegistro.value;
    const email = this.ArrayUsService.getEmail();
    const dni = this.ArrayUsService.getDni();
    const nombre = datosUsuario.nombre;
    const apellidos = datosUsuario.apellidos;
    const localidad = datosUsuario.localidad;
    const residencia = datosUsuario.residencia;
    const tlf = datosUsuario.tlf;
    const rol = datosUsuario.rol;
    this.registro(email, dni, nombre, apellidos, localidad, residencia, tlf,rol)
    this.onReset();
  }

  registro(email: any, dni: any, nombre: any, apellidos: any, localidad: any, residencia: any, tlf: any, rol:any) {
    this.RegistroService.RegistroPersona(email, dni, nombre, apellidos, localidad, residencia, tlf,rol).subscribe(
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

}