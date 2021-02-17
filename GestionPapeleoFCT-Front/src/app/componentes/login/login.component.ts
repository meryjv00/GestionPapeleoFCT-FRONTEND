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
  user: any;
  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {
    this.nuevoLogin = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    });
    this.message = "";
    this.user = {
      access_token: "",
      email: "",
      dni: "",
      apellidos: "",
      nombre: "",
      localidad: "",
      residencia: "",
      correo: "",
      telefono: "",
      rol: ""
    }
  }

  ngOnInit(): void {
    //Si ya hemos hecho login vamos a vista lista cursos
    if (this.loginService.isUserSignedIn()) {
      this.router.navigate(['/listaCursos']);
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
    this.login(email, password);
  }

  login(email: string, password: string){
    this.loginService.login(email, password).subscribe(
      (response: any) => {
        //console.log(response.message);
        this.message = "Login correcto";
        this.user.access_token = response['message']['access_token'];
        this.user.email = response.message.user.email;
        //Guardar datos usuario
        this.user.dni = response.message.datos_user.dni;
        this.user.apellidos = response.message.datos_user.apellidos;
        this.user.nombre = response.message.datos_user.nombre;
        this.user.residencia = response.message.datos_user.residencia;
        this.user.localidad = response.message.datos_user.localidad;
        this.user.correo = response.message.datos_user.correo
        this.user.telefono = response.message.datos_user.tlf;
        this.user.rol = response.message.rol;
        //Guardamos el usuario en session storage
        this.loginService.saveUser(this.user);
        this.router.navigate(['/listaCursos']);
      },
      (error) => {
        console.log(error.error.message);
        this.message = error.error.message;
      }
    );
  }
  
  onReset() {
    this.submitted = false;
    this.nuevoLogin.reset();
  }

}
