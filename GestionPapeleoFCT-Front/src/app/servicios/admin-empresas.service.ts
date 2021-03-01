import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaComponent } from '../componentes/empresa/empresa.component';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';


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

  //Carga una lista con todas las empresas
  public getEmpresas = () => {
    const url = environment.dirBack + "empresas";

    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });

    return this.http.get(url, { headers: headers });
  }

  //Insertar empresa
  public insertEmpresa = (empresa: any) => {
    const url = environment.dirBack + "insertEmpresa";
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
    const url = environment.dirBack + "deleteEmpresa/" + id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'id': id }, { headers: headers });
  };

  public deleteEmpresaSuscription = (id: any) => {
    this.deleteEmpresa(id).subscribe(
      (response: any) => {
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
    const url = environment.dirBack + "updateEmpresa/" + empresa.id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.put(url, { 'empresa': empresa }, { headers: headers });
  };

  //Añade un responsable de una empresa
  public addResponsable = (responsable: any) => {
    const url = "http://localhost:8000/api/addResponsableEmpresa/";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'responsable': responsable }, { headers: headers });
  }

  //Elimina el responsable de una empresa. Recibe su DNI
  deleteResponsable = (responsable: any) => {
    const url = "http://localhost:8000/api/deleteResponsableEmpresa/";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.post(url, { 'dniResponsable': responsable }, { headers: headers });
  }

}
