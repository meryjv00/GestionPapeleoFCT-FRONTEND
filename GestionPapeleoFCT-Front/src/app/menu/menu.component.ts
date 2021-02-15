import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: any;
  constructor(private loginService: LoginService,private router: Router) {
    this.user = this.loginService.getUser();
   }

  ngOnInit(): void {
  }

    //Cerrar sesión
  logOut(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
