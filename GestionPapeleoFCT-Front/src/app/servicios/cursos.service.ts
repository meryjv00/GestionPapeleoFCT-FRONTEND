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
    const url = environment.dirBack + 'curso/';
    return this.http.post(url, curso, { headers: headers });
  }

  // Modificamos un curso
  public updateCurso = (curso: any) => {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });
    console.log(curso);
    const url = environment.dirBack + 'curso/';
    return this.http.put(url + curso.id, {'curso': curso}, {headers: headers });
  }

  // Método para borrar un curso
  public deleteCurso = (id: number) => {  
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });
    console.log('llego borrar, id: ' + id);
    const url = environment.dirBack + 'curso/';
    return this.http.delete(url + id, { headers: headers });
  }

}
