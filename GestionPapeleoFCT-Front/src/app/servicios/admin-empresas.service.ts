import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class AdminEmpresasService {

  message: string;

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login']);
    }
    this.message = "";
  }

  //Insertar empresa
  public insertEmpresa = (empresa: any) => {
    const url = "http://localhost:8000/api/insertEmpresa";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'empresa': empresa }, { headers: headers });
  };

  public insertEmpresaSuscription = (empresa: any) => {
    this.insertEmpresa(empresa).subscribe(
      (response: any) => {
        console.log(response);
        this.message = "Insercción correcta";
        this.router.navigate(['/listaEmpresas']);
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  };

  //Eliminar empresa
  public deleteEmpresa = (id: any) => {
    const url = "http://localhost:8000/api/deleteEmpresa/" + id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'id': id }, { headers: headers });
  };

  public deleteEmpresaSuscription = (id: any) => {
    this.deleteEmpresa(id).subscribe(
      (response: any) => {
        console.log(response);
        this.message = "Se ha eliminado la empresa";
        this.router.navigate(['listaEmpresas']);
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  };

  //Actualizar empresa
  public updateEmpresa = (empresa: any) => {
    //console.log(empresa);
    const url = "http://localhost:8000/api/updateEmpresa/" + empresa.id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.put(url, { 'empresa': empresa }, { headers: headers });
  };

  /**
   * Manda generar el anexo 0
   * Recibe el id del archivo generado para redirigir a la ruta adecuada
   * @param empresa 
   */
  public anexo0 = (empresa: any) => {
    console.log(empresa);
    const url = "http://localhost:8000/api/getAnexo0/" + empresa.id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.get(url, { headers: headers });
  }

  /**
   * Manda generar el anexo 1
   * Requiere un OBJETO 'datos' con 2 valores: numConvenio e idCurso
   * @param datos 
   */
  public anexo1 = (datos: any) => {
    const url = "http://localhost:8000/api/getAnexo1";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'datos': datos }, { headers: headers });
  }

}
