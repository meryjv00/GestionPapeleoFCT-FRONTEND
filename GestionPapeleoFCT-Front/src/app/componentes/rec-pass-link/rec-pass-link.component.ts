import { Component, OnInit } from '@angular/core';
import { EnvEmailService } from 'src/app/servicios/env-email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { RecPassContolService } from 'src/app/servicios/rec-pass-contol.service';

@Component({
  selector: 'app-rec-pass-link',
  templateUrl: './rec-pass-link.component.html',
  styleUrls: ['./rec-pass-link.component.scss']
})
export class RecPassLinkComponent implements OnInit {
  nuevoRec: FormGroup;
  submitted = false;
  user: any;
  message: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private EnvEmailService: EnvEmailService,private rutaActiva: ActivatedRoute,private RecPassContolService: RecPassContolService) { 
    this.user={
      email: this.rutaActiva.snapshot.queryParams.email,
      token: this.rutaActiva.snapshot.queryParams.token
    };
    this.nuevoRec = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength]],
      password2: ['', [Validators.required,Validators.minLength]]
    });
    this.message = "";
  }
  get formulario() { return this.nuevoRec.controls;}

  ngOnInit(): void {
    this.isUser(this.user.email,this.user.token);
  }

  onSubmit() {
    this.submitted = true;
    if (this.nuevoRec.invalid) {
      return;
    }
    let datosUsuario = this.nuevoRec.value;
    const password = datosUsuario.password;
    if(!this.validarDistintasPass()){
      this.rePass(this.user.email,password);
      this.router.navigate(['/login']);
      this.onReset();
    }
  }

  rePass(email: any,password: any) {
    this.RecPassContolService.Mod_pass(email,password).subscribe(
      (response: any) => {
        //console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
  isUser(email: any,token: any) {
    this.RecPassContolService.IsUser(email,token).subscribe(
      (response: any) => {
        //console.log(response);
        if (response.menssage.res===false){
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  validarDistintasPass() {
    let salida =true;
    if(this.nuevoRec.get('password')?.value === this.nuevoRec.get('password2')?.value){
      salida = false;
    }
    return salida;
  }
  onReset() {
    this.submitted = false;
    this.nuevoRec.reset();
  }
}

