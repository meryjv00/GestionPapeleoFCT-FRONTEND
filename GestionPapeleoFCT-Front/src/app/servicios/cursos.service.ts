import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });

    return this.http.post(environment.dirBack + "curso", curso, { headers: headers });
  }

  // Modificamos un curso
  public updateCurso = (curso: any) => {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });
    console.log(curso);

    return this.http.put(environment.dirBack + "curso/" + curso.id, {'curso': curso}, {headers: headers });
  }

  // Método para borrar un curso
  public deleteCurso = (id: number) => {  
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });    
    return this.http.delete(environment.dirBack + "curso/" + id, { headers: headers });
  }

}
