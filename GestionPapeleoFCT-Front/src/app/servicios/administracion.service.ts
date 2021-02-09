import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login']);
    }
  }

  //Insertar cursos
  public insertCursos = () => {
    const url = "http://localhost:8000/api/generarCursos";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, {}, { headers: headers });
  };

  //Insertar alumnos
  public insertAlumnos = () => {
    const url = "http://localhost:8000/api/generarAlumnos";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, {}, { headers: headers });
  };
}
