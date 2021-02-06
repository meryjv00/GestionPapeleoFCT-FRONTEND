import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: any;
  constructor(private loginService: LoginService) {
    this.user = this.loginService.getUser();
   }

  ngOnInit(): void {
  }

}
