import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ModUsLogService {

  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;
  user: any;

  constructor(private router: Router, private http: HttpClient,private loginService: LoginService ) {
    this.user = {
      email: "",
      oldpassword:"",
      newpassword:""
    }
    this.message = "";
  }
   /**
   * Petición de modificacion de usuario
   * */
  public Mod_user_pass = (email:any, password: any, newpassword:any) => {
    const url = environment.dirBack+"mod_user_pass";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });
    return this.http.put(url, {'email' : email, 'password': password, 'newpassword': newpassword}, { headers: headers });
  };
  /**
  * Petición de modificacion de usuario email
  * */
  public Mod_user_email = (email:any, newemail: any) => {
    const url = environment.dirBack+"mod_user_email";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });
    return this.http.put(url, {'email' : email, 'newemail': newemail}, { headers: headers });
  };
}