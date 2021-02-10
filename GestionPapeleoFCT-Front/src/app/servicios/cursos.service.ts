import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }

  // Guardamos un curso
  public storeCurso = (curso: any) => {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}}`
    });

    return this.http.post("http://localhost:8000/api/curso", curso, { headers: headers });
  }


}
