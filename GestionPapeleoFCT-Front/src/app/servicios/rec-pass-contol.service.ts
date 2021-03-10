import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RecPassContolService {

  constructor(private router: Router, private http: HttpClient,) { }


  public Mod_pass = (email:any, newpassword:any) => {
    const url = environment.dirBack+"mod_pass";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, {'email' : email, 'newpassword': newpassword}, { headers: headers });
  };

  public IsUser = (email:any, token:any) => {
    const url = environment.dirBack+"is_us_mod_pass";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(url, {'email' : email, 'token': token}, { headers: headers });
  };
}