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
   * Petición de registro
   * */
  public EnvEmail = (nombreUsuario: string, asunto: string, email: string) => {
    const url = environment.dirBack + "env";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, { 'nombreUsuario' : nombreUsuario, 'asunto': asunto, 'email': email }, { headers: headers });
  };
}
