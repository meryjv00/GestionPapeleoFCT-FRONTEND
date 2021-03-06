import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IsPersonaService {

  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;
  persona: any;

  constructor(private router: Router, private http: HttpClient) {
    this.persona = {
      dni: ""
    }
    this.message = "";
  }
  public existePersona = (dni:string) => {
    const url = environment.dirBack + "isPersona";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, {'dni' : dni}, { headers: headers });
  };
}