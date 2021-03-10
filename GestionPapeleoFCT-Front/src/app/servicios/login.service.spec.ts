import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../componentes/login/login.component';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        RouterTestingModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ])
      ],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Tests. By: María
   */
  describe('Casos login', () => {
    //---------------------------------------------------------------------------------
    //------------------------------ Cuenta correcta ----------------------------------
    //---------------------------------------------------------------------------------
    it('Cuenta correcta login', (done: DoneFn) => {
      // Arr
      const usuario = {
        id: 1,
        email: 'director@gmail.com',
        dni: '99999999X',
        nombre: 'Ana Belén',
        apellidos: 'Santos Cabañas',
        pass: '12345678'
      }
      // Act
      service.login(usuario.email, usuario.pass).subscribe((response: any) => {
        // Ass
        // Comprobamos código devuelto
        expect(response['code']).toBe(200);
        // Comprobamos campos devueltos
        expect(response['message']['user']['id']).toBe(usuario.id);
        expect(response['message']['user']['email']).toBe(usuario.email);
        expect(response['message']['user']['dni']).toBe(usuario.dni);
        expect(response['message']['datos_user']['nombre']).toBe(usuario.nombre);
        expect(response['message']['datos_user']['apellidos']).toBe(usuario.apellidos);

        // Indicamos que la función asíncrona ha terminado
        done();
      });
    });

    //---------------------------------------------------------------------------------
    //----------------------------- Cuenta incorrecta ---------------------------------
    //---------------------------------------------------------------------------------
    it('Cuenta inccorrecta login', (done: DoneFn) => {
      // Arr
      const usuario = {
        email: 'directorr@gmail.com',
        pass: '12345678'
      }
      // Act
      service.login(usuario.email, usuario.pass).subscribe(
        (response: any) => {
          done();
        },
        (error: any) => {
          // Ass
          // Comprobamos código devuelto
          expect(error['error']['code']).toBe(400);

          // Comprobamos mensaje devuelto
          expect(error['error']['message']).toBe('Login incorrecto. Revise las credenciales.');

          // Indicamos que la función asíncrona ha terminado
          done();
        }
      );
    });

    //---------------------------------------------------------------------------------
    //------------------------------ Cuenta desactivada -------------------------------
    //---------------------------------------------------------------------------------
    it('Cuenta desactivada login', (done: DoneFn) => {
      // Arr
      const usuario = {
        email: 'bcano@gmail.com',
        pass: '12345678'
      }
      // Act
      service.login(usuario.email, usuario.pass).subscribe(
        (response: any) => {
          done();
        },
        (error: any) => {
          // Ass
          // Comprobamos código devuelto
          expect(error['error']['code']).toBe(400);

          // Comprobamos mensaje devuelto
          expect(error['error']['message']).toBe('Cuenta desactivada, contacte con el director.');

          // Indicamos que la función asíncrona ha terminado
          done();
        }
      );
    });

  });

});