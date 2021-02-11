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

  //Insertar profesores
  public insertProfesores = () => {
    const url = "http://localhost:8000/api/generarProfesores";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, {}, { headers: headers });
  };

  //Insertar alumnos
  public insertAlumnos = (cursoSeleccionado: any) => {
    const url = "http://localhost:8000/api/generarAlumnos";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, {'id': cursoSeleccionado.id,'cicloFormativoA': cursoSeleccionado.cicloFormativoA}, { headers: headers });
  };
}
