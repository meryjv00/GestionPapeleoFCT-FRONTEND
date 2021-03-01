import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class ModUsService {

  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;
  user: any;

  constructor(private router: Router, private http: HttpClient) {
    this.user = {
      email: "",
      rol:""
    }
    this.message = "";
  }
   /**
   * Petición de modificacion de usuario
   * */
  public Mod_user = (correo:any, dni: any, olddni: any, nombre: any, apellidos: any, localidad: any,residencia: any, tlf: any) => {
    const url = "http://localhost:8000/api/mod_user";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, {'correo' : correo, 'dni': dni, 'olddni': olddni, 'nombre' : nombre, 'apellidos': apellidos, 'localidad': localidad, 'residencia': residencia , 'tlf': tlf}, { headers: headers });
  };
}