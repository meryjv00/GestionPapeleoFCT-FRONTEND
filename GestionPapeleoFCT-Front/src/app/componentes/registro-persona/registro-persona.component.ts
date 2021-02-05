import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroPersonaService } from 'src/app/servicios/registro-persona.service';
import { ArrayUsService } from 'src/app/servicios/array-us.service';

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.scss']
})
export class RegistroPersonaComponent implements OnInit {
  nuevoRegistro: FormGroup;
  submitted = false;
  message: string;

  constructor(private ArrayUsService: ArrayUsService, private registroPersonaService: RegistroPersonaService, private formBuilder: FormBuilder, private router: Router) {
    this.nuevoRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      residencia: ['', [Validators.required]],
      tlf: ['', [Validators.required]]
    });
    this.message = "";
  }
  ngOnInit(): void {
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
    this.registroPersonaService.registroSuscription(email,dni,nombre,apellidos,localidad, residencia, tlf);
    this.onReset();
    this.message = this.registroPersonaService.message;
  }

  onReset() {
    this.submitted = false;
    this.nuevoRegistro.reset();
  }

  cancel() {
    this.onReset();
  }

}