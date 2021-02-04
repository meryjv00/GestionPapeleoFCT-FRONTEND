import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { identity } from 'lodash';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ListaAlumnosService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/listaCursos']);
    }
  }

  public getAlumnos = (id: any) => {
    const url = "http://localhost:8000/api/alumnos/" + id;

    console.log(this.loginService.user.access_token);
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });

    return this.http.get(url, { headers: headers });
  };
}
