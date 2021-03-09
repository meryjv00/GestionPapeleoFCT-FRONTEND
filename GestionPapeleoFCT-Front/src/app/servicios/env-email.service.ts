import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvEmailService {

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
   * Petición de enviar email
   * */
  public EnvEmail = (nombreUsuario: string, asunto: string, email: string) => {
    const url = environment.dirBack + "env";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });
    return this.http.post(url, { 'nombreUsuario' : nombreUsuario, 'asunto': asunto, 'email': email }, { headers: headers });
  };
  /**
  * Petición de enviar email para recuperar contraseña
  * */
  public RecPass = (email: string) => {
    const url = environment.dirBack + "RecPass";
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(url, { 'email': email,'link':'http://localhost:4200/recPass' }, { headers: headers });
 };
}
