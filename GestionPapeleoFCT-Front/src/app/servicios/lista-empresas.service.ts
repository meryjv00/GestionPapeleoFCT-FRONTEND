import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ListaEmpresasService {

  //Cambia la vista si el usuario NO ha iniciado sesión
  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn()){
      router.navigate(['/listaCursos']);
    }
  }

  //Carga una lista con todas las empresas
  public getEmpresas = () => {
    const url = "http://localhost:8000/api/empresas";

    console.log(this.loginService.getUser().access_token);
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });

    return this.http.get(url, { headers: headers });
  }

}
