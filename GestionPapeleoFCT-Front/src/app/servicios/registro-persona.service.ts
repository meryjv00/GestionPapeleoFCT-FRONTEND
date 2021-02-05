import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { ArrayUsService } from 'src/app/servicios/array-us.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroPersonaService {

  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: any;
  user: any;

  constructor(private router: Router, private http: HttpClient, private ArrayUsService: ArrayUsService) {
    this.message = "";
  }
  public Registro = (email:any, dni: any, nombre: any, apellidos: any, localidad: any,residencia: any, tlf: any) => {
    const url = "http://localhost:8000/api/register_persona";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, {'email' : email, 'dni': dni, 'nombre' : nombre, 'apellidos': apellidos, 'localidad': localidad, 'residencia': residencia , 'tlf': tlf }, { headers: headers });
  };
}
