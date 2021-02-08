import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class IsPersonaService {

  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  message: string;
  persona: any;

  constructor(private router: Router, private http: HttpClient) {
    this.persona = {
      email: ""
    }
    this.message = "";
  }
  public Prueba = (email:string) => {
    const url = "http://localhost:8000/api/isPersona";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, {'email' : email}, { headers: headers });
  };
}