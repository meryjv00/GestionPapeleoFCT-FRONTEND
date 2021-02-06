import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss']
})
export class OpcionesComponent implements OnInit {

  constructor(private loginService: LoginService,private router: Router) { }

  ngOnInit(): void {
  }

  //Cerrar sesión
  logOut(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
