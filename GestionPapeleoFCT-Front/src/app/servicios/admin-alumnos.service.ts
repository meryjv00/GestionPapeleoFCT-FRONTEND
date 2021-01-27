import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    const url = "http://localhost:8000/api/insertAlumno";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.post(url,{ 'alumno': alumno, 'curso': curso.id }, { headers: headers });
  };

  public insertAlumnoSuscription = (alumno: any, curso: any) => {
    this.insertAlumno(alumno, curso).subscribe(
      (response: any) => {
        console.log(response);
        this.message = "Inserción correcta";
        this.router.navigate(['/listaAlumnos',curso]);
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  };

  //Actualizar alumno
  public updateAlumno = (alumno: any) => {
    console.log(alumno);
    const url = "http://localhost:8000/api/updateAlumno/" + alumno.id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.put(url,{'alumno': alumno}, { headers: headers });
  };

  public updateAlumnoSuscription = (alumno: any) => {
    this.updateAlumno(alumno).subscribe(
      (response: any) => {
        console.log(response);
        this.message = "Actualización correcta";
        this.router.navigate(['/alumno',alumno]);
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }

  //Eliminar alumno
  public deleteAlumno = (alumno: any) => {
    const url = "http://localhost:8000/api/deleteAlumno/" + alumno.id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.delete(url, { headers: headers });
  };

  public deleteAlumnoSuscription = (alumno: any) => {
    this.deleteAlumno(alumno).subscribe(
      (response: any) => {
        console.log(response);
        this.message = "Borrado correcto";
        //Ir a a la vista del curso de ese alumno
        this.router.navigate(['/listaCursos']);
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }
}
