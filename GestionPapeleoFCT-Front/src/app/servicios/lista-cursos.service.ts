import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class ListaCursosService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    
    if (!loginService.isUserSignedIn()){
      router.navigate(['/login']);
    }
  }

  public getCursos = () => {
    const url = "http://localhost:8000/api/cursos";

    console.log(this.loginService.user.access_token);
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });

    return this.http.get(url, { headers: headers });
  };
}
