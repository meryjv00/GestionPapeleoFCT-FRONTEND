import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //Almacenará mediante esta key los datos de login en session storage
  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;
  user: any;

  constructor(private router: Router, private http: HttpClient) {
    this.user = {
      access_token: "",
      email: ""
    }
    this.message = "";
    //Si estamos logeados nos vamos a /listaCursos
    if(this.isUserSignedIn()){
      router.navigate(['/listaCursos']);
    }
   }

   /**
   * Petición de login
   * */
  public login = (email: string, password: string) => {
    const url = "http://localhost:8000/api/login";

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, { 'email': email, 'password': password }, { headers: headers });
  };

  /**
   * Subscripción a la petición de login, si todo es correcto, la almacena en session storage y
   * vamos a /articles. Si se produce un error lo muestra
   * */
  public loginSuscription(email: string, password: string) {
    this.login(email, password).subscribe(
      (response: any) => {
        console.log(response);
        this.message = "Login correcto";
        this.user.access_token = response['message']['access_token'];
        this.user.email = response.message.user.email;
        sessionStorage.setItem(LoginService.SESSION_STORAGE_KEY, JSON.stringify(this.user));
        this.router.navigate(['/listaCursos']);
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }

  /**
   * Comprueba si está logeado y si es así almacena los datos para poder hacer peticiones
   */
  
  public isUserSignedIn(): boolean {
    let isSignedIn = false;
    let userAux: any|null;
    userAux = {
      access_token: "",
      email: ""
    }
    if(!_.isEmpty(sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY))) {
      isSignedIn = true;
      userAux = sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY);
      userAux = JSON.parse(userAux);
      this.user = userAux;
    }
    return isSignedIn;
  }
}
