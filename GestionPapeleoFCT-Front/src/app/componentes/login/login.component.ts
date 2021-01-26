import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  nuevoLogin: FormGroup;
  submitted = false;
  message: string;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
    this.nuevoLogin = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    });
    this.message = "";
  }

  ngOnInit(): void {
    //Si ya hemos hecho login vamos a /lista cursos provisional
    if (this.loginService.isUserSignedIn()) {
      this.router.navigate(['/nuevoAlumno']);
    }
  }

  get formulario() { return this.nuevoLogin.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.nuevoLogin.invalid) {
      return;
    }
    let datosUsuario = this.nuevoLogin.value;
    const email = datosUsuario.email;
    const password = datosUsuario.password;
    this.onReset();
    //Nos subscribimos a la petición de login que se implementa en el servicio
    this.loginService.loginSuscription(email, password);
    this.message = this.loginService.message;
  }

  onReset() {
    this.submitted = false;
    this.nuevoLogin.reset();
  }

  cancel() {
    this.onReset();
  }
}
