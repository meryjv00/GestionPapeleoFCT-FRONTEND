import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Almacenará mediante esta key los datos de login en session storage
  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";

  constructor(private router: Router, private http: HttpClient) { }

  /**
  * Petición de login
  * */
  public login = (email: string, password: string) => {
    const url = environment.dirBack + 'login';

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, { 'email': email, 'password': password }, { headers: headers });
  };


  /**
   * Comprueba si está logeado y si es así almacena los datos para poder hacer peticiones
   */
  public isUserSignedIn(): boolean {
    return !_.isEmpty(sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY));
  }

  /**Almacena los datos de usuario en sessionStorage */
  public saveUser(user: any) {
    sessionStorage.setItem(LoginService.SESSION_STORAGE_KEY, JSON.stringify(user));
  }


  /**Si el usuario está loggeado obtenemos la información de dicho usuario */
  public getUser(): any {
    let user: any | null = {
      access_token: "",
      apellidos: "",
      dni: "",
      email: "",
      localidad: "",
      nombre: "",
      residencia: "",
      rol: "",
      telefono: ""
    };
    if (this.isUserSignedIn()) {
      user = sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY);
      user = JSON.parse(user);
    }
    return user;
  }

  /**Elimina el token de acceso de sessionStorage */
  public logout() {
    sessionStorage.removeItem(LoginService.SESSION_STORAGE_KEY);
  }

}
