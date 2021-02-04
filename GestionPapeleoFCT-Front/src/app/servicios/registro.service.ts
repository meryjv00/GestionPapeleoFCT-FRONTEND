import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { ArrayUsService } from 'src/app/servicios/array-us.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;
  user: any;

  constructor(private ArrayUsService: ArrayUsService, private router: Router, private http: HttpClient) {
    this.user = {
      access_token: "",
      email: ""
    }
    this.message = "";
  }
   /**
   * Petición de registro
   * */
  public Registro = (dni: string, email: string, password: string, rol: string) => {
    const url = "http://localhost:8000/api/register";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, { 'dni' : dni, 'email': email, 'password': password, 'rol': rol }, { headers: headers });
  };
  /**
   * Subscripción a la petición de Registro, si todo es correcto, la almacena en session storage y
   * vamos a /home. Si se produce un error lo muestra
   * */
  public registroSuscription(dni: string, email: string, password: string, rol: string) {
    this.Registro(dni, email, password, rol).subscribe(
      (response: any) => {
        console.log(response);
        this.message = "Registro correcto";
        this.user.access_token = response['message']['access_token'];
        this.user.email = response.message.user.email;
        sessionStorage.setItem(RegistroService.SESSION_STORAGE_KEY, JSON.stringify(this.user));
        this.ArrayUsService.setArray(email,dni);
        this.router.navigate(['registroPersona']);
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }
}
