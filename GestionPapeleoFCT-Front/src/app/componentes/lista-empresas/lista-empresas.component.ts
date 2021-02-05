import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaEmpresasService } from 'src/app/servicios/lista-empresas.service';
import { AdminEmpresasService } from "src/app/servicios/admin-empresas.service";
import { CompartirDatosService } from 'src/app/servicios/compartir-datos.service';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.scss']
})
export class ListaEmpresasComponent implements OnInit {

  id: any; nombre: any; provincia: any; localidad: any; calle: any; cp: any; cif: any; tlf: any; email: any;
  empresas: any;
  crearNueva: boolean;
  mensaje: any;
  textoAddEmpresa: any;

  constructor(private CompartirDatos: CompartirDatosService, private adminEmpresasService: AdminEmpresasService, private route: ActivatedRoute, private router: Router, private listaEmpresasService: ListaEmpresasService) {
    this.empresas = [];
    this.crearNueva = false;
    this.mensaje = "";
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
    this.listaEmpresasService.getEmpresas().subscribe(
      (response: any) => {
        this.empresas = [];
        console.log(response);
        const empresas = response.message;

        empresas.forEach((element: { id: any; nombre: any; provincia: any; localidad: any; calle: any;
          cp: any; cif: any; tlf: any; email: any; }) => {
          let empresa = {
            'id': element.id,
            'nombre': element.nombre,
            'provincia': element.provincia,
            'localidad': element.localidad, 
            'calle': element.calle,
            'cp': element.cp,
            'cif': element.cif,
            'tlf': element.tlf,
            'email': element.email
          };
          this.empresas.push(empresa);
        });
      }, (error) => {
        console.log(error);
      }
      

    );
  }

  anexo0(empresa: any) {
    this.adminEmpresasService.anexo0(empresa).subscribe(
      (response: any) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    );
  }

}
