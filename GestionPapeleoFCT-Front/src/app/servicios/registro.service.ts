import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;
  user: any;

  constructor(private router: Router, private http: HttpClient,private loginService: LoginService) {
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
    const url = environment.dirBack + "register";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, { 'dni' : dni, 'email': email, 'password': password , 'activado': 0 }, { headers: headers });
  };

  public RegistroPersona = (email:any, dni: any, nombre: any, apellidos: any, localidad: any,residencia: any,correo:any, tlf: any, rol:any) => {
    const url = environment.dirBack + "register_persona";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, {'email' : email, 'dni': dni, 'nombre' : nombre, 'apellidos': apellidos, 'localidad': localidad, 'residencia': residencia ,'correo': correo, 'tlf': tlf, 'rol': rol }, { headers: headers });
  };
}
