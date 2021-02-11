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
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });

    return this.http.post("http://localhost:8000/api/curso", curso, { headers: headers });
  }

  // Modificamos un curso
  public updateCurso = (curso: any) => {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });
    console.log(curso);

    return this.http.put("http://localhost:8000/api/curso/" + curso.id, {'curso': curso}, {headers: headers });
  }

  // Método para borrar un curso
  public deleteCurso = (id: number) => {  
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });
    console.log('llego borrar, id: ' + id);
    
    return this.http.delete("http://localhost:8000/api/curso/" + id, { headers: headers });
  }

}
