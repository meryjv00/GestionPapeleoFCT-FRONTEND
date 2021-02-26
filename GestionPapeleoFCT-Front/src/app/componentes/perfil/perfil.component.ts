import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAlumnosService } from 'src/app/servicios/admin-alumnos.service';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { LoginService } from 'src/app/servicios/login.service';
import { ModUsService } from 'src/app/servicios/mod-us.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  nuevoRegistro: FormGroup;
  user: any;
  submitted = false;


  fotoPerfil: FormGroup;
  foto: any;
  submittedFoto = false;
  fotoRecibida: any;
  
  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private mod_user: ModUsService,
    private AdminAlumnosService: AdminAlumnosService) {
    this.nuevoRegistro = this.formBuilder.group({
      email: '',
      nombre: '',
      apellidos: '',
      dni: '',
      localidad: '',
      residencia: '',
      telefono: ''
    });
    this.user = this.loginService.getUser();
    this.fotoPerfil = this.formBuilder.group({
      fotoPerfil: ['', [Validators.required]]
    });

  }

  get formulario() { return this.nuevoRegistro.controls; }
  get formularioFoto() { return this.fotoPerfil.controls; }



  ngOnInit(): void {
  }

  /**
  * Se guarda la foto
  * @param event 
  */
  guardarFoto(event: any) {
    this.foto = <File>event.target.files[0];
  }

  onSubmitFoto() {
    this.submittedFoto = true;
    if (this.fotoPerfil.invalid) {
      return;
    }

    this.AdminAlumnosService.cambiarFoto(this.foto,this.user.dni).subscribe(
      (response: any) => {
        alert(response.message);
        this.fotoRecibida = response.message;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.nuevoRegistro.invalid) {
      return;
    }
    let datosUsuario = this.nuevoRegistro.value;
    const email = datosUsuario.email;
    const dni = this.user.dni;
    const nombre = datosUsuario.nombre;
    const apellidos = datosUsuario.apellidos;
    const localidad = datosUsuario.localidad;
    const residencia = datosUsuario.residencia;
    const tlf = datosUsuario.telefono;
    this.update(email, dni, nombre, apellidos, localidad, residencia, tlf);
    this.onReset();
  }

  update(email: any, dni: any, nombre: any, apellidos: any, localidad: any, residencia: any, tlf: any) {
    this.mod_user.Mod_user(email, dni, nombre, apellidos, localidad, residencia, tlf).subscribe(
      (response: any) => {
        console.log(response);
        this.user.email = email;
        this.user.dni = dni;
        this.user.nombre = nombre;
        this.user.apellidos = apellidos;
        this.user.localidad = localidad;
        this.user.residencia = residencia;
        this.user.telefono = tlf;
        this.loginService.saveUser(this.user);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }



  onReset() {
    this.submitted = false;
    this.user = this.loginService.getUser();
  }
}