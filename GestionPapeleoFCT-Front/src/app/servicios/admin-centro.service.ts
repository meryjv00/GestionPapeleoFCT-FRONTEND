import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCentroService {
  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService,) {
    this.message = "";
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login']);
    }
  }

  public getCentro = () => {
    const url = environment.dirBack + "getCentro";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.get(url,{ headers: headers });
  };
  
  public updateCentro = (codigo : any, cif : any, nombre : any, provincia : any, localidad : any, cp : any, calle : any, email : any, tlf : any) => {
    const url = environment.dirBack + "updateCentro";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{'codigo' : codigo, 'cif' : cif, 'nombre' : nombre, 'provincia' : provincia, 'localidad' : localidad, 'cp' : cp, 'calle' : calle, 'email' : email, 'tlf' : tlf},{ headers: headers });
  };

  public getDirector = () => {
    const url = environment.dirBack + "getDirector";
    let headers = new HttpHeaders({Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.get(url,{ headers: headers });
  };
}
