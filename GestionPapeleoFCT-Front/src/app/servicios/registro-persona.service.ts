import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class RegistroPersonaService {

  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;
  user: any;

  constructor(private router: Router, private http: HttpClient) {
    this.user = {
      access_token: "",
      email: ""
    }
    this.message = "";
  }
  public Registro = (email:string, dni: string, nombre: string, apellidos: string, localidad: string,residencia: string, tlf: number) => {
    const url = "http://localhost:8000/api/register_persona";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, {'email' : email, 'dni': dni, 'nombre' : nombre, 'apellidos': apellidos, 'localidad': localidad, 'residencia': residencia , 'tlf': tlf }, { headers: headers });
  };
  
  public registroSuscription(email: string, dni: string, nombre: string, apellidos: string, localidad: string,residencia: string, tlf: number) {
    this.Registro(email, dni, nombre, apellidos, localidad, residencia, tlf).subscribe(
      (response: any) => { 
        console.log(response);
        this.message = "Registro correcto";
        this.user.access_token = response['message']['access_token'];
        this.user.email = response.message.user.email;
        sessionStorage.setItem(RegistroPersonaService.SESSION_STORAGE_KEY, JSON.stringify(this.user));
        this.router.navigate(['listaCursos']);
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }
}
