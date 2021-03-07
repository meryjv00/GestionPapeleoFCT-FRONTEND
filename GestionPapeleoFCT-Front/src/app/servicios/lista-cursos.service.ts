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
        const url = environment.dirBack + "cursos";

        //console.log(this.loginService.getUser().access_token);

        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });

        return this.http.get(url, { headers: headers });
    };

    public getCursosSinTutor = () => {
        const url = environment.dirBack + "cursosSinTutor";

        //console.log(this.loginService.user.access_token);

        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });

        return this.http.get(url, { headers: headers });
    };

    public getCursosSinAlumnos = () => {
        const url = environment.dirBack + "cursosSinAlumnos";

        //console.log(this.loginService.user.access_token);

        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });

        return this.http.get(url, { headers: headers });
    };


    public getMisCursos = (dni: any) => {
        const url = environment.dirBack + "cursos/" + dni;

        //console.log(this.loginService.user.access_token);

        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });

        return this.http.get(url, { headers: headers });
    };


    public getAlumnos = (id: any) => {
        const url = environment.dirBack + "alumnos/" + id;

        //console.log(this.loginService.user.access_token);
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });

        return this.http.get(url, { headers: headers });
    };


    public getFamilies = () => {
        const url = environment.dirBack + "cursosFamilies";

        //console.log(this.loginService.user.access_token);
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });

        return this.http.get(url, { headers: headers });
    };

    // Método para obtener las empresas que no estan ligadas al curso
    public getEmpresasNoCurso = (id: any) => {
        const url = environment.dirBack + "empresasNoCurso/" + id;
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.get(url, { headers: headers });
    };

    // Método para obtener las empresas que estan ligadas al curso
    public getEmpresasCurso = (id: any) => {
        const url = environment.dirBack + "empresasCurso/" + id;
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.get(url, { headers: headers });
    };

    // Método para agregar una nueva empresa a un curso para realizar practicas
    public addEmpresaCurso(idCurso: any, idEmpresa: any) {
        const url = environment.dirBack + "addEmpresaCurso";
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.post(url, { 'idCurso': idCurso, 'idEmpresa': idEmpresa }, { headers: headers });
    };

    // Métodopara eliminar una empresa en un curso para realizar las practicas
    public deleteEmpresaCurso(idEmpresa: any, idCurso: any) {

        const url = environment.dirBack + "deleteEmpresaCurso/" + idEmpresa + "/" + idCurso;
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.delete(url, { headers: headers });
    }

}
