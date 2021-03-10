import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../componentes/login/login.component';

import { AdminEmpresasService } from './admin-empresas.service';

describe('AdminEmpresasService', () => {
  let service: AdminEmpresasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent}
        ])
      ],
    });
    service = TestBed.inject(AdminEmpresasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  //--------------------Autor: Daniel

  it('InsertEmpresa correcto', (done: DoneFn) => {

    const empresa = {
      'nombre': 'test',
      'provincia': 'ciudad test',
      'localidad': 'conil',
      'calle': 'Manzanares',
      'cp': '12002',
      'cif': '1234567890P',
      'tlf': '666555454',
      'email': 'dhwajd@da.com',
      'dniRepresentante': '05938432O',
      'nombreRepresentante': 'Andreu'
    }
    // Act
    service.insertEmpresa(empresa).subscribe(
      (response: any) => {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      //console.log(response);
      // Código correcto
      expect(response['code']).toBe(201);
      // Campos email y dni correctos
      // expect(response['message']['user']['email']).toBe(usuario.email);
      // expect(response['message']['user']['dni']).toBe(usuario.dni);

      done();
    },
    (error: any) => {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      console.log(error);
    }
    );
  });  

});
