import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
        const url = environment.dirBack + 'cursos';

        //console.log(this.loginService.user.access_token);

        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token.access_token}` });

        return this.http.get(url, { headers: headers });
    };

    public getMisCursos = (dni: any) => {
        const url = environment.dirBack + 'cursos/' + dni;

        //console.log(this.loginService.user.access_token);

        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token.access_token}` });

        return this.http.get(url, { headers: headers });
    };


    public getAlumnos = (id: any) => {
        const url = environment.dirBack + 'alumnos/' + id;

        //console.log(this.loginService.user.access_token);
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });

        return this.http.get(url, { headers: headers });
    };


    public getFamilies = () => {
        const url = environment.dirBack + 'cursosFamilies';

        //console.log(this.loginService.user.access_token);
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });

        return this.http.get(url, { headers: headers });
    };

}
