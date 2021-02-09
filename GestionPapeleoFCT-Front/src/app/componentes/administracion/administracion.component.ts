import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {

  constructor(private administracionService: AdministracionService,private loginService: LoginService,private router: Router) {
    if (!loginService.isUserSignedIn()){
      this.router.navigate(['/login']);
    }
   }

  ngOnInit(): void {
  }

  insertCursos(){
    this.administracionService.insertCursos().subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  insertAlumnos(){
    this.administracionService.insertAlumnos().subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  insertProfesores(){

  }
}
