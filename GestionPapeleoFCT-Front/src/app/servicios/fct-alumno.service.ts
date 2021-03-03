import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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

    return this.http.post(environment.dirBack + "addAlumnoPracticas", data, { headers: headers });
  }

  // Método para eliminar un alumno de las practicas
  public deleteAlumnoPractica = (dniAlumno: any) => {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });

    return this.http.delete(environment.dirBack + "deleteAlumnoPracticas/" + dniAlumno, { headers: headers });
  }

  // Método para obtener los datos de un alumnos en practicas en una empresa
  public getAlumnoFct = (dniAlumno: any) => {
    const url = environment.dirBack + "alumnoFct/" + dniAlumno;
    //console.log(this.loginService.user.access_token);
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token.access_token}` });
    return this.http.get(url, { headers: headers });
  };

  // Método para modificar unas practicas
    public updateAlumnoFct = (data: any) => {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.loginService.getUser().access_token}`
    });
    return this.http.put(environment.dirBack + "updateAlumnoPracticas/" + data.dniAlumno , data, { headers: headers });
  };

}
