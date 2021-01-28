import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaEmpresasService } from 'src/app/servicios/lista-empresas.service';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.scss']
})
export class ListaEmpresasComponent implements OnInit {

  id: any; nombre: any; provincia: any; localidad: any; calle: any; cp: any; cif: any; tlf: any; email: any;
  empresas: any;

  crearNueva: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private listaEmpresasService: ListaEmpresasService) {
    /**
     *     if (!loginService.isUserSignedIn()){
      this.router.navigate(['/login']);
    }
     */
    this.empresas = [];
    this.id = this.route.snapshot.paramMap.get('id');
    this.nombre = this.route.snapshot.paramMap.get('nombre');
    this.provincia = this.route.snapshot.paramMap.get('provincia');
    this.localidad = this.route.snapshot.paramMap.get('localidad');
    this.calle = this.route.snapshot.paramMap.get('calle');
    this.cp = this.route.snapshot.paramMap.get('cp');
    this.cif = this.route.snapshot.paramMap.get('cif');
    this.tlf = this.route.snapshot.paramMap.get('tlf');
    this.email = this.route.snapshot.paramMap.get('email');

    this.crearNueva = false;
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  clickCrearNueva() {
    this.crearNueva = !this.crearNueva;
  }

  getEmpresas() {
    this.listaEmpresasService.getEmpresas().subscribe(
      (response: any) => {
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
