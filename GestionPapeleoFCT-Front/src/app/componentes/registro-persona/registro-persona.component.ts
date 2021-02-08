import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroPersonaService } from 'src/app/servicios/registro-persona.service';
import { ArrayUsService } from 'src/app/servicios/array-us.service';
import { IsPersonaService } from 'src/app/servicios/is-persona.service'

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.scss']
})
export class RegistroPersonaComponent implements OnInit {
  nuevoRegistro: FormGroup;
  submitted = false;
  message: string;
  persona: any;

  constructor(private ArrayUsService: ArrayUsService,private IsPersonaService: IsPersonaService, private registroPersonaService: RegistroPersonaService, private formBuilder: FormBuilder, private router: Router) {
    this.nuevoRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      residencia: ['', [Validators.required]],
      tlf: ['', [Validators.required]]
    });
    this.message = "";
    this.persona = this.IsPer(this.ArrayUsService.getEmail());
  }
  ngOnInit(): void {
  }

  IsPer(email: string) {
    this.IsPersonaService.Prueba(email).subscribe(
      (response: any) => { 
        console.log(response);
        this.persona = response.message.persona;
        console.log(this.persona);
        sessionStorage.setItem(IsPersonaService.SESSION_STORAGE_KEY, JSON.stringify(this.persona));
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

    let datosUsuario = this.nuevoRegistro.value;
    const email = this.ArrayUsService.getEmail();
    const dni = this.ArrayUsService.getDni();
    const nombre = datosUsuario.nombre;
    const apellidos = datosUsuario.apellidos;
    const localidad = datosUsuario.localidad;
    const residencia = datosUsuario.residencia;
    const tlf = datosUsuario.tlf;
    this.registro(email, dni, nombre, apellidos, localidad, residencia, tlf)
    this.onReset();
    this.message = this.registroPersonaService.message;
  }

  registro(email: any, nombre: any, apellidos: any, dni: any, localidad: any, residencia: any, tlf: any) {
    this.registroPersonaService.Registro(email, dni, nombre, apellidos, localidad, residencia, tlf).subscribe(
      (response: any) => {
        console.log(response);
        this.message = "Registro correcto";
        this.router.navigate(['login']);
      },
      (error) => {
        this.message = error.error.message;
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