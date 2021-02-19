import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FctAlumnoService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }

  // Añadimos un alumno a unas practicas
  public storeAlumnoPracticas = (data: any) => {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });

    return this.http.post("http://localhost:8000/api/addAlumnoPracticas", data, { headers: headers });
  }

  // Método para eliminar un alumno de las practicas
  public deleteAlumnoPractica = (dniAlumno: any) => {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });

    return this.http.delete("http://localhost:8000/api/deleteAlumnoPracticas/" +  dniAlumno, { headers: headers });

  }

}
