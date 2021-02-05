import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/servicios/registro.service';
@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.scss']
})
export class RegistroUserComponent implements OnInit {
  nuevoRegistro: FormGroup;
  submitted = false;
  message: string;

  constructor(private registroService: RegistroService, private formBuilder: FormBuilder, private router: Router) {
    this.nuevoRegistro = this.formBuilder.group({
      dni: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      rol: ['', [Validators.required]]
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
    const dni = datosUsuario.dni;
    const email = datosUsuario.email;
    const password = datosUsuario.password;
    const rol = datosUsuario.rol;
    //Nos subscribimos a la petición de registro que se implementa en el servicio
    this.registroService.registroSuscription(dni,email, password, rol);
    this.onReset();
    this.message = this.registroService.message;
  }

  onReset() {
    this.submitted = false;
    this.nuevoRegistro.reset();
  }

  cancel() {
    this.onReset();
  }

}