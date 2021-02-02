import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaEmpresasService } from 'src/app/servicios/lista-empresas.service';
import { AdminEmpresasService } from "src/app/servicios/admin-empresas.service";

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.scss']
})
export class ListaEmpresasComponent implements OnInit {

  id: any; nombre: any; provincia: any; localidad: any; calle: any; cp: any; cif: any; tlf: any; email: any;
  empresas: any;

  crearNueva: boolean;

  constructor(private adminEmpresasService: AdminEmpresasService, private route: ActivatedRoute, private router: Router, private listaEmpresasService: ListaEmpresasService) {
    this.empresas = [];
    this.crearNueva = false;
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  clickCrearNueva() {
    this.crearNueva = !this.crearNueva;
  }

  eliminarEmpresa(empresa: any){
    let seguroEliminar = confirm("¿Estás seguro de que quieres eliminar la empresa de la Base de datos?");
    if (seguroEliminar) {
      console.log("Ahora eliminaríamos el registro, ID: " + empresa.id);
      this.adminEmpresasService.deleteEmpresaSuscription(empresa.id);
      alert("Empresa eliminada.");
      this.getEmpresas();
    }
  }

  clickEditar(){}

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

  getEmpresasTest() {
    let empresa = {
      'id': 1,
      'nombre': 'INDRA',
      'provincia': 'Ciudad Real',
      'localidad': 'Ciudad Real',
      'calle': 'Ronda Calatrava s/n',
      'cp': '13300',
      'cif': '1234567f',
      'tlf': '123456789',
      'email': 'indra@indra.com'
    };
    this.empresas.push(empresa);
    empresa = {
      'id': 2,
      'nombre': 'ENOVA',
      'provincia': 'Ciudad Real',
      'localidad': 'Ciudad Real',
      'calle': 'Ronda Toledo s/n',
      'cp': '13300',
      'cif': 'p9876532',
      'tlf': '254167412',
      'email': 'enova@enova.com'
    };
    this.empresas.push(empresa);
  }

}
