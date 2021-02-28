import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminEmpresasService } from "src/app/servicios/admin-empresas.service";
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';
import { environment } from 'src/environments/environment';
import { AnexosService } from 'src/app/servicios/anexos.service';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.scss']
})
export class ListaEmpresasComponent implements OnInit {

  id: any; nombre: any; provincia: any; localidad: any; calle: any; cp: any; cif: any; tlf: any; email: any;
  empresas: any;
  crearNueva: boolean;
  textoAddEmpresa: any;

  constructor(private anexosService: AnexosService, private CompartirDatos: CompartirDatosService, private adminEmpresasService: AdminEmpresasService, private route: ActivatedRoute, private router: Router) {
    this.empresas = [];
    this.crearNueva = false;
    this.textoAddEmpresa = "Añadir empresa";
  }

  /**
   * Llama a recuperar todas las empresas de la BD
   */
  ngOnInit(): void {
    this.getEmpresas();
  }

  /**
   * Cambia la var. de control para mostrar/ocultar el formulario de 'nueva empresa'
   */
  clickCrearNueva() {
    if (this.crearNueva) {
      this.textoAddEmpresa = "Añadir empresa";
    } else {
      this.textoAddEmpresa = "Cancelar";
    }
    this.crearNueva = !this.crearNueva;
  }

  /**
   * Guarda la empresa sobre la que se ha hecho click en CompartirDatos y manda a la vista /empresa
   * @param empresa 
   */
  clickEditar(empresa: any){
    this.CompartirDatos.setEmpresa(empresa);
    this.router.navigate(['/empresa']);
  }

  /**
   * Recupera todas las empresas a través del servicio listaEmpresas
   */
  getEmpresas() {
    this.adminEmpresasService.getEmpresas().subscribe(
      (response: any) => {
        this.empresas = [];
        console.log(response);
        const empresas = response.message;

        empresas.forEach((element: { id: any; nombre: any; provincia: any; localidad: any; calle: any;
          cp: any; cif: any; tlf: any; email: any; dniRepresentante: any; nombreRepresentante: any; }) => {
          let empresa = {
            'id': element.id,
            'nombre': element.nombre,
            'provincia': element.provincia,
            'localidad': element.localidad, 
            'calle': element.calle,
            'cp': element.cp,
            'cif': element.cif,
            'tlf': element.tlf,
            'email': element.email,
            'dniRepresentante': element.dniRepresentante,
            'nombreRepresentante': element.nombreRepresentante,
          };
          this.empresas.push(empresa);
        });
      }, (error) => {
        console.log(error);
      }
      

    );
  }

  /**
   * Manda generar el anexo 0 con el servicio 'anexos' y lo manda descargar
   * redirigiendo a la url donde se encuentra el archivo
   * @param empresa 
   */
  anexo0(empresa: any) {
    this.anexosService.anexo0(empresa).subscribe(
      (response: any) => {
        console.log(response);
        let enlace = environment.dirBack2 + 'descargar/' + response.message;
        window.open(enlace,'_blank');
      }, (error) => {
        console.log(error);
      }
    );
  }

  anexo1() {
    var datos = {
      'numConvenio': '4433434',
      'idCurso': 11
    }
    this.anexosService.anexo1(datos).subscribe(
      (response: any) => {
        console.log(response);
        let enlace = environment.dirBack2 + 'descargar/' + response.message;
        window.open(enlace,'_blank');
      }, (error) => {
        console.log(error);
      }
    );
  }

  anexo2() {
    var datos = {
      'idAlumno': 1,
      'idEmpresa': 1,
      'idCurso': 1
    }
    this.anexosService.anexo2(datos).subscribe(
      (response: any) => {
        console.log(response);
        let enlace = environment.dirBack2 + 'descargar/' + response.message;
        window.open(enlace,'_blank');
      }, (error) => {
        console.log(error);
      }
    );
  }

  anexo3() {
    var datos = {
      'idAlumno': 1,
      'idEmpresa': 1,
      'idCurso': 1
    }
    this.anexosService.anexo3(datos).subscribe(
      (response: any) => {
        console.log(response);
        let enlace = environment.dirBack2 + 'descargar/' + response.message;
        window.open(enlace,'_blank');
      }, (error) => {
        console.log(error);
      }
    );
  }

  anexo4() {
    var datos = {
      'idAlumno': 1,
      'idEmpresa': 1,
      'idCurso': 1
    }
    this.anexosService.anexo4(datos).subscribe(
      (response: any) => {
        console.log(response);
        let enlace = environment.dirBack2 + 'descargar/' + response.message;
        window.open(enlace,'_blank');
      }, (error) => {
        console.log(error);
      }
    );
  }

  anexo5() {
    var datos = {
      'idAlumno': 1,
      'idEmpresa': 1,
      'idCurso': 1
    }
    this.anexosService.anexo5(datos).subscribe(
      (response: any) => {
        console.log(response);
        let enlace = environment.dirBack2 + 'descargar/' + response.message;
        window.open(enlace,'_blank');
      }, (error) => {
        console.log(error);
      }
    );
  }

}
