import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayUsService {
  public static readonly SESSION_STORAGE_KEY: string = "apiPassport";
  email:string;
  dni:string;

  constructor() {
    this.email = '';
    this.dni = '';
  }
  
  setArray(email: string,dni: string) {
    this.email = email;
    this.dni = dni;
  }
  
  getEmail() {
    return this.email;
  }
  getDni() {
    return this.dni;
  }
}
