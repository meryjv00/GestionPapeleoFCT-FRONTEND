import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/servicios/registro.service';
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.scss']
})
export class RegistroUserComponent implements OnInit {
  nuevoRegistro: FormGroup;
  submitted = false;
  message: string;
  //salida = true;

  constructor(private registroService: RegistroService, private formBuilder: FormBuilder, private router: Router,private CompartirDatosService: CompartirDatosService) {
    this.nuevoRegistro = this.formBuilder.group({
      dni: ['', [Validators.required,Validators.pattern]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength]],
      password2: ['', [Validators.required,Validators.minLength]]
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
    //Nos subscribimos a la petición de registro que se implementa en el servicio
    this.registroSuscription(dni,email, password);
    this.onReset();
    this.message = this.registroService.message;
  }

  onReset() {
    this.submitted = false;
    this.nuevoRegistro.reset();
  }

  /**
   * Subscripción a la petición de Registro, si todo es correcto, la almacena en session storage y
   * vamos a /home. Si se produce un error lo muestra
   * */
  public registroSuscription(dni: string, email: string, password: string) {
    this.registroService.Registro(dni, email, password).subscribe(
      (response: any) => {
        //console.log(response.message);
        this.CompartirDatosService.setArray(email,dni);
        this.router.navigate(['registroPersona']);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  validarDistintasPass() {
    let salida =true;
    if(this.nuevoRegistro.get('password')?.value === this.nuevoRegistro.get('password2')?.value){
      salida = false;
    }
    return salida;
  }

}