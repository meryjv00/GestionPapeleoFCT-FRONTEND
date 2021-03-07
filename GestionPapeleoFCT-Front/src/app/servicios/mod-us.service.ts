import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ModUsService {

  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;
  user: any;

  constructor(private router: Router, private http: HttpClient, private loginService: LoginService) {
    this.user = {
      email: "",
      rol:""
    }
    this.message = "";
  }
   /**
   * Petición de modificacion de usuario
   * */
  public Mod_user = (token:any, correo:any, dni: any, olddni: any, nombre: any, apellidos: any, localidad: any,residencia: any, tlf: any) => {
    const url = environment.dirBack+"mod_user";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, {'token' : token,'correo' : correo, 'dni': dni, 'olddni': olddni, 'nombre' : nombre, 'apellidos': apellidos, 'localidad': localidad, 'residencia': residencia , 'tlf': tlf}, { headers: headers });
  };
}