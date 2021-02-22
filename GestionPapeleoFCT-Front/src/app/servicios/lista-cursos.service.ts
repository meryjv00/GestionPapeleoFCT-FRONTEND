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

    public getCursosSinTutor = () => {
        const url = "http://localhost:8000/api/cursosSinTutor";

        //console.log(this.loginService.user.access_token);

        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token.access_token}` });

        return this.http.get(url, { headers: headers });
    };

    public getCursosSinAlumnos = () => {
        const url = "http://localhost:8000/api/cursosSinAlumnos";

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

    // Método para obtener las empresas que no estan ligadas al curso
    public getEmpresasNoCurso = (id: any) => {
        const url = "http://localhost:8000/api/empresasNoCurso/" + id;
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.get(url, { headers: headers });
    };

    // Método para obtener las empresas que estan ligadas al curso
    public getEmpresasCurso = (id: any) => {
        const url = "http://localhost:8000/api/empresasCurso/" + id;
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.get(url, { headers: headers });
    };

    // Método para agregar una nueva empresa a un curso para realizar practicas
    public addEmpresaCurso(idCurso: any, idEmpresa: any) {
        const url = "http://localhost:8000/api/addEmpresaCurso";
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.post(url, { 'idCurso': idCurso, 'idEmpresa': idEmpresa }, { headers: headers });
    };

    // Métodopara eliminar una empresa en un curso para realizar las practicas
    public deleteEmpresaCurso(idEmpresa: any, idCurso: any) {

        const url = "http://localhost:8000/api/deleteEmpresaCurso/" + idEmpresa + "/" + idCurso;
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.delete(url, { headers: headers });
    }

}
