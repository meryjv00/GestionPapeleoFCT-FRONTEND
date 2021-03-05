import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsablesEmpresaService {
  message: string;
  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn()) {
      router.navigate(['/login']);
    }
    this.message = "";
  }

  // Método para ver los alumnos de un curso que no tenga empresa para practicas
  public getResponsablesEmpresa = (idEmpresa: any) => {
    const url = environment.dirBack + "responsablesEmpresas/" + idEmpresa;
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
    return this.http.get(url, { headers: headers });
  }
}
