import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
@Injectable({
    providedIn: 'root'
})
export class ListaCursosService {

    constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
        if (!loginService.isUserSignedIn()) {
            router.navigate(['/login']);
        }
    }

    public getCursos = () => {
        const url = "http://localhost:8000/api/cursos";

        //console.log(this.loginService.user.access_token);

        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token.access_token}` });

        return this.http.get(url, { headers: headers });
    };

    public getMisCursos = (dni: any) => {
        const url = "http://localhost:8000/api/cursos/" + dni;

        //console.log(this.loginService.user.access_token);

        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token.access_token}` });

        return this.http.get(url, { headers: headers });
    };


    public getAlumnos = (id: any) => {
        const url = "http://localhost:8000/api/alumnos/" + id;

        //console.log(this.loginService.user.access_token);
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });

        return this.http.get(url, { headers: headers });
    };


    public getFamilies = () => {
        const url = "http://localhost:8000/api/cursosFamilies";

        //console.log(this.loginService.user.access_token);
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });

        return this.http.get(url, { headers: headers });
    };

}
