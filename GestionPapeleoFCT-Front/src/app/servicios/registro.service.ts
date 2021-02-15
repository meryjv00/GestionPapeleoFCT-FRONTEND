import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { ArrayUsService } from 'src/app/servicios/array-us.service';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;
  user: any;

  constructor(private ArrayUsService: ArrayUsService, private router: Router, private http: HttpClient,private loginService: LoginService) {
    this.user = {
      email: "",
      rol:""
    }
    this.message = "";
  }
   /**
   * Petición de registro
   * */
  public Registro = (dni: string, email: string, password: string) => {
    const url = environment.dirBack + 'register';

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, { 'dni' : dni, 'email': email, 'password': password }, { headers: headers });
  };
  /**
   * Subscripción a la petición de Registro, si todo es correcto, la almacena en session storage y
   * vamos a /home. Si se produce un error lo muestra
   * */
  public registroSuscription(dni: string, email: string, password: string) {
    this.Registro(dni, email, password).subscribe(
      (response: any) => {
        console.log(response);
        this.ArrayUsService.setArray(email,dni);
        this.message = "Registro correcto";
        this.user.email = response.message.user.email;
        this.router.navigate(['registroPersona']);
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }

  public RegistroPersona = (email:any, dni: any, nombre: any, apellidos: any, localidad: any,residencia: any, tlf: any, rol:any) => {
    const url = environment.dirBack + 'register_persona';

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, {'email' : email, 'dni': dni, 'nombre' : nombre, 'apellidos': apellidos, 'localidad': localidad, 'residencia': residencia , 'tlf': tlf, 'rol': rol }, { headers: headers });
  };
}
