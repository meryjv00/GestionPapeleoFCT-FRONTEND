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
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.post(url,{ 'empresa': empresa }, { headers: headers });
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

  //Actualizar empresa
  public updateEmpresa = (empresa: any) => {
    console.log(empresa);
    const url = "http://localhost:8000/api/updateEmpresa/" + empresa.id;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });
    return this.http.put(url,{'empresa': empresa}, { headers: headers });
  };


}
