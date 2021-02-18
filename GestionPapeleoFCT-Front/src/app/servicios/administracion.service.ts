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

  //Insertar profesores CSV
  public insertProfesores = (csv: File) => {
    const url = "http://localhost:8000/api/generarProfesores";
    const fd = new FormData;
    fd.append('csv', csv, csv.name);
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, fd, { headers: headers });
  };

  //Insertar alumnos CSV
  public insertAlumnos = (csv: File, cursoSeleccionado: any) => {
    const url = "http://localhost:8000/api/generarAlumnos/" + cursoSeleccionado.id + "/" + cursoSeleccionado.cicloFormativoA;
    const fd = new FormData;
    fd.append('csv', csv, csv.name);
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, fd, { headers: headers });
  };

  //Añade a un nuevo profesor como jefe de estudios
  public addJefeEstudios = (profesor: any) => {
    const url = "http://localhost:8000/api/addJefeEstudios";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'dniProf': profesor.dni }, { headers: headers });
  }

  //Obtiene todas las cuentas inactivas (jefes de estudio y tutores)
  public getCuentasAdministrar = () => {
    const url = "http://localhost:8000/api/getCuentasAdministrar";
    //console.log(this.loginService.user.access_token);
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token.access_token}` });
    return this.http.get(url, { headers: headers });
  }

  //Obtiene todas las cuentas activas (jefes de estudio y tutores)
  public getCuentasActivas = () => {
    const url = "http://localhost:8000/api/getCuentasActivas";
    //console.log(this.loginService.user.access_token);
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token.access_token}` });
    return this.http.get(url, { headers: headers });
  }


  //Cambia el rol al contrario que tenga
  public cambiarRol = (dni: any, rol: any) => {
    const url = "http://localhost:8000/api/cambiarRol";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'dni': dni, 'rol': rol }, { headers: headers });
  };

  //Activa o desactiva la cuenta del usuario cuyo dni recibe por parámetro
  public activarDesactivarCuenta = (dni: any) => {
    const url = "http://localhost:8000/api/activarDesactCuenta/" + dni;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.put(url, { 'dni': dni }, { headers: headers });
  };


  //Deniega acceso a la cuenta del usuario cuyo dni recibe por parámetro
  public denegarAccesoCuenta = (dni: any) => {
    const url = "http://localhost:8000/api/denegarAccesoCuenta/" + dni;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.put(url, { 'dni': dni }, { headers: headers });
  };

  //Obtiene todos los tutores
  public getTutores = () => {
    const url = "http://localhost:8000/api/getTutores";
    //console.log(this.loginService.user.access_token);
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token.access_token}` });
    return this.http.get(url, { headers: headers });
  }

  //Añade a un nuevo profesor como jefe de estudios
  public addTutorCurso = (profesor: any, curso: any) => {
    const url = "http://localhost:8000/api/addTutorCurso/" + curso.id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.put(url, { 'curso': curso, 'dniProfesor': profesor.dni }, { headers: headers });
  };

  public reiniciarAlumnos = () => {
    const url = "http://localhost:8000/api/reiniciarAlumnos";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token.access_token}` });
    return this.http.get(url, { headers: headers });
  }

}
