import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAlumnosService {
  message: string;
  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login']);
    }
   this.message = "";
  }

  //Insertar alumno
  public insertAlumno = (alumno: any, curso: any) => {
    const url = environment.dirBack + 'insertAlumno';
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url,{ 'alumno': alumno, 'curso': curso.id }, { headers: headers });
  };


  //Actualizar alumno
  public updateAlumno = (alumno: any) => {
    console.log(alumno);
    const url = environment.dirBack + 'updateAlumno/' + alumno.id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.put(url,{'alumno': alumno}, { headers: headers });
  };


  //Eliminar alumno
  public deleteAlumno = (alumno: any) => {
    const url = environment.dirBack + 'deleteAlumno/' + alumno.id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.delete(url, { headers: headers });
  };
}
