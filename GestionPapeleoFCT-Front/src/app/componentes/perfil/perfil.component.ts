import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login.service';
import { ModUsService } from 'src/app/servicios/mod-us.service';
import { ModUsLogService } from 'src/app/servicios/mod-us-log.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  nuevoRegistro: FormGroup;
  registroPass: FormGroup;
  registroNewEmail: FormGroup;
  user: any;
  mod: any;
  submitted = false;


  constructor(private loginService: LoginService,private formBuilder: FormBuilder, private mod_user: ModUsService, private mod_user_pass: ModUsLogService) {
    
    this.user = this.loginService.getUser();
      this.nuevoRegistro = this.formBuilder.group({
        email: ['', [Validators.required,Validators.email]],
        nombre: ['', [Validators.required,Validators.pattern]],
        apellidos: ['', [Validators.required,Validators.pattern]],
        dni: ['', [Validators.required,Validators.pattern]],
        localidad: ['', [Validators.required,Validators.minLength]],
        residencia: ['', [Validators.required,Validators.minLength]],
        telefono: ['', [Validators.required,Validators.pattern]]
      });
    this.registroPass = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength]],
      newpassword: ['', [Validators.required,Validators.minLength]],
      renewpassword: ['', [Validators.required,Validators.minLength]]
    });

    this.registroNewEmail = this.formBuilder.group({
      nemail: ['', [Validators.required,Validators.email]]
    });
    this.mod = this.loginService.getUser();
  }

  get formulario() { return this.nuevoRegistro.controls; }
  get formulario2() { return this.registroPass.controls; }
  get formulario3() { return this.registroNewEmail.controls; }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.nuevoRegistro.touched){
      if (this.nuevoRegistro.invalid) {
        return;
      }
      let datosUsuario = this.nuevoRegistro.value;
      const email = datosUsuario.email;
      const olddni =this.user.dni;
      const dni = datosUsuario.dni;
      const nombre = datosUsuario.nombre;
      const apellidos = datosUsuario.apellidos;
      const localidad = datosUsuario.localidad;
      const residencia = datosUsuario.residencia;
      const tlf = datosUsuario.telefono;
      this.update(email, dni, olddni, nombre, apellidos, localidad, residencia, tlf);
    }else if (this.registroPass.touched){
      if (this.registroPass.invalid || this.validarDistintasPass()) {
        return;
      }

      let datosPass = this.registroPass.value;

      if (datosPass.password === datosPass.newpassword) {
        return;
      }

      const email = this.user.email;
      const oldpassword = datosPass.password;
      const newpassword = datosPass.newpassword;
      this.updatePass(email,oldpassword,newpassword);
    }else if (this.registroNewEmail.touched){
      if (this.registroNewEmail.invalid) {
        return;
      }

      let datosEmail = this.registroNewEmail.value;
      const email = this.user.email;
      const newemail = datosEmail.nemail;
      this.updateEmail(email,newemail);
    }
    this.onReset();
  }

  update(email: any, dni: any, olddni: any, nombre: any, apellidos: any, localidad: any, residencia: any, tlf: any) {
    this.mod_user.Mod_user(email, dni, olddni, nombre, apellidos, localidad, residencia, tlf).subscribe(
      (response: any) => {
        this.user.email=email;
        this.user.dni=dni;
        this.user.nombre=nombre;
        this.user.apellidos=apellidos;
        this.user.localidad=localidad;
        this.user.residencia=residencia;
        this.user.telefono=tlf;
        this.loginService.saveUser(this.user);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  updatePass(email: any, oldpassword: any, newpassword: any) {
    this.mod_user_pass.Mod_user_pass(email, oldpassword, newpassword).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
  updateEmail(email: any,newemail: any) {
    this.mod_user_pass.Mod_user_email(email, newemail).subscribe(
      (response: any) => {
        console.log(response);
        this.user = this.loginService.getUser();
        this.user.email=newemail;
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

  validarDistintasPass() {
    let salida =true;
    if(this.registroPass.get('newpassword')?.value === this.registroPass.get('renewpassword')?.value){
      salida = false;
    }
    return salida;
  }
}