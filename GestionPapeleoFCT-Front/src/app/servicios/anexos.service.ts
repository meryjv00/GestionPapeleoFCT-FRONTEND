import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AnexosService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  /**
   * Recupera todos los anexos de la BD
   */
  getAnexos() {
    const url = environment.dirBack + "anexos";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.get(url, { headers: headers });
  }


  /**
   * Manda generar el anexo 0
   * Recibe el id del archivo generado para redirigir a la ruta adecuada
   * @param empresa 
   */
  public anexo0 = (empresa: any) => {
    console.log(empresa);
    const url = environment.dirBack + "getAnexo0/" + empresa.id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.get(url, { headers: headers });
  }

  /**
   * Manda generar el anexo 1
   * Requiere un OBJETO 'datos' con 2 valores: idEmpresa e idCurso
   * @param datos 
   */
  public anexo1 = (datos: any) => {
    const url = environment.dirBack + "getAnexo1";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'datos': datos }, { headers: headers });
  }

  /**
   * Manda generar el anexo 2
   * Requiere un OBJETO 'datos' con los valores: idAlumno, idEmpresa, idCurso
   * @param datos 
   */
  public anexo2 = (datos: any) => {
    const url = environment.dirBack + "getAnexo2";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'datos': datos }, { headers: headers });
  }

  /**
   * Manda generar el anexo 3
   * Requiere un OBJETO 'datos' con los valores: idAlumno, idEmpresa, idCurso
   * @param datos 
   */
  public anexo3 = (datos: any) => {
    const url = environment.dirBack + "getAnexo3";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'datos': datos }, { headers: headers });
  }

  /**
   * Manda generar el anexo 4
   * Requiere un OBJETO 'datos' con los valores: idAlumno, idEmpresa, idCurso
   * @param datos 
   */
  public anexo4 = (datos: any) => {
    const url = environment.dirBack + "getAnexo4";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'datos': datos }, { headers: headers });
  }

  /**
   * Manda generar el anexo 5
   * Requiere un OBJETO 'datos' con los valores: idAlumno, idEmpresa, idCurso
   * @param datos 
   */
  public anexo5 = (datos: any) => {
    const url = environment.dirBack + "getAnexo5";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'datos': datos }, { headers: headers });
  }

  /**
   * Manda generar el anexo 6
   * Requiere un OBJETO 'datos' con el valor: idCurso
   * @param datos 
   */
   public anexo6 = (datos: any) => {
    const url = environment.dirBack + "getAnexo6";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'datos': datos }, { headers: headers });
  }

  /**
   * Manda generar el anexo 7
   * Requiere un OBJETO 'datos' con el valor: idCurso
   * @param datos 
   */
   public anexo7 = (datos: any) => {
    const url = environment.dirBack + "getAnexo7";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'datos': datos }, { headers: headers });
  }
}
