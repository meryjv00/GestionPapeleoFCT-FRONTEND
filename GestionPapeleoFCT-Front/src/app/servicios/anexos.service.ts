import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AnexosService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getAnexos(){
    const url = "http://localhost:8000/api/anexos";
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token.access_token}` });
    return this.http.get(url, { headers: headers });
  }
}
