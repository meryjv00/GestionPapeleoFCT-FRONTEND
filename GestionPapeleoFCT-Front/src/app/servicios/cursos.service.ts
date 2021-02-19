import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }

  // Guardamos un curso
  public storeCurso = (curso: any) => {
    const url = environment.dirBack + "curso";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });
    return this.http.post(url, curso, { headers: headers });
  }

  // Modificamos un curso
  public updateCurso = (curso: any) => {
    const url = environment.dirBack + "curso/" + curso.id;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });
    console.log(curso);

    return this.http.put(url, {'curso': curso}, {headers: headers });
  }

  // Método para borrar un curso
  public deleteCurso = (id: number) => { 
    const url = environment.dirBack + "curso/" + id;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });    
    return this.http.delete(url + id, { headers: headers });
  }

}