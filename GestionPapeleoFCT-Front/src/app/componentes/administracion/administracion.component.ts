import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})

export class AdministracionComponent implements OnInit {
  submitted = false;
  insertCursosForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private administracionService: AdministracionService,private loginService: LoginService,private router: Router) {
    if (!loginService.isUserSignedIn()){
      this.router.navigate(['/login']);
    }

    this.insertCursosForm = this.formBuilder.group({
      cursos: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
  }

  get formulario() { return this.insertCursosForm.controls; }

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

  onSubmitCursos() {
    this.submitted = true;
    if (this.insertCursosForm.invalid) {
      return;
    }
    this.administracionService.insertCursos().subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.log(error);
      }
    );
    alert("Cursos añadidos");
    this.router.navigate(['/admin']);
  }
}
