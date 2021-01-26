import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {
  dni: any; nombre: any; apellidos: any; localidad: any; residencia: any; correo: any; telefono: any;
  
  constructor(private route: ActivatedRoute,private router: Router,private loginService: LoginService) { 
    if (!loginService.isUserSignedIn()){
      this.router.navigate(['/login']);
    }
    this.dni = this.route.snapshot.paramMap.get('dni');
    this.nombre = this.route.snapshot.paramMap.get('nombre');
    this.apellidos = this.route.snapshot.paramMap.get('apellidos');
    this.localidad = this.route.snapshot.paramMap.get('localidad');
    this.residencia = this.route.snapshot.paramMap.get('residencia');
    this.correo = this.route.snapshot.paramMap.get('correo');
    this.telefono = this.route.snapshot.paramMap.get('telefono');
  }

  ngOnInit(): void {

  }

  //Editar Eliminar alumno-> metodos en servicio
}
