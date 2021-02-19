import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FctAlumnoService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { }

  // Añadimos un alumno a unas practicas
  public storeAlumnoPracticas = (data: any) => {
    const url = environment.dirBack + "addAlumnoPracticas";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });

    return this.http.post(url, data, { headers: headers });
  }

  // Método para eliminar un alumno de las practicas
  public deleteAlumnoPractica = (dniAlumno: any) => {
    const url = environment.dirBack + "deleteAlumnoPracticas/" +  dniAlumno;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });

    return this.http.delete(url, { headers: headers });

  }

}
