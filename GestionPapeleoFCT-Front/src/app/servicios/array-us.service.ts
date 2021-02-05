import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayUsService {
  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  email:string;
  dni:string;
  rol:any;

  constructor() {
    this.email = '';
    this.dni = '';
    this.rol = 0;
  }
  
  setArray(email: string,dni: string,rol: any) {
    this.email = email;
    this.dni = dni;
    this.rol =rol;
  }
  
  getRol() {
    return this.rol;
  }
  getEmail() {
    return this.email;
  }
  getDni() {
    return this.dni;
  }
}
