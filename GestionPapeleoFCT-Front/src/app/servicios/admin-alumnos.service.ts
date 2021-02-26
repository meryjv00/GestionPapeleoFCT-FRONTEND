import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAlumnosService {
    message: string;
    constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
        if (!loginService.isUserSignedIn()) {
            router.navigate(['/login']);
        }
        this.message = "";
    }

    //Insertar alumno
    public insertAlumno = (alumno: any, curso: any) => {
        const url = "http://localhost:8000/api/insertAlumno";
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.post(url, { 'alumno': alumno, 'curso': curso.id }, { headers: headers });
    };


    //Actualizar alumno
    public updateAlumno = (alumno: any) => {
        console.log(alumno);
        const url = "http://localhost:8000/api/updateAlumno/" + alumno.id;
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.put(url, { 'alumno': alumno }, { headers: headers });
    };


    //Eliminar alumno
    public deleteAlumno = (alumno: any) => {
        const url = "http://localhost:8000/api/deleteAlumno/" + alumno.id;
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.delete(url, { headers: headers });
    };

    // Método para ver los alumnos de un curso que no tenga empresa para practicas
    public getAlumnosCurso = (idCurso: any) => {
        const url = "http://localhost:8000/api/alumnosCursoSinEmpresa/" + idCurso;
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.get(url, { headers: headers });
    }

    // Método para ver los alumnos de practica en una empresa
    public getAlumnosPraticas = (idCurso: any, idEmpresa: any) => {
        const url = "http://localhost:8000/api/alumnosCursoPracticas/" + idCurso + "/" + idEmpresa;
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.get(url, { headers: headers });
    }


    //Cambiar foto perfil
    public cambiarFoto = (img: File, dni: any) => {
        const url = "http://localhost:8000/api/cambiarFoto/" + dni;
        const fd = new FormData;
        fd.append('img', img, img.name);
        let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.getUser().access_token}` });
        return this.http.post(url, fd, { headers: headers });
    };
}
