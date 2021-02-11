import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class AdminCentroService {
  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;

  constructor(private http: HttpClient, private router: Router) {
    this.message = "";
  }

  public getCentro = () => {
    const url = "http://localhost:8000/api/getCentro";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, { headers: headers });
  };
  
  public updateCentro = (codigo : any, cif : any, nombre : any, provincia : any, localidad : any, cp : any, calle : any, email : any, tlf : any) => {
    const url = "http://localhost:8000/api/updateCentro";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url,{'codigo' : codigo, 'cif' : cif, 'nombre' : nombre, 'provincia' : provincia, 'localidad' : localidad, 'cp' : cp, 'calle' : calle, 'email' : email, 'tlf' : tlf},{ headers: headers });
  };
}
