import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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

  //Insertar profesores CSV
  public insertProfesores = () => {
    const url = environment.dirBack + 'generarProfesores';
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, {}, { headers: headers });
  };

  //Insertar alumnos CSV
  public insertAlumnos = (cursoSeleccionado: any) => {
    const url = environment.dirBack + 'generarAlumnos';
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, {'id': cursoSeleccionado.id,'cicloFormativoA': cursoSeleccionado.cicloFormativoA}, { headers: headers });
  };
}
