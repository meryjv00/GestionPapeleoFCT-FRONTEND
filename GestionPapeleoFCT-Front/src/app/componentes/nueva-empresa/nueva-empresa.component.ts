import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminEmpresasService } from "src/app/servicios/admin-empresas.service";
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';

@Component({
  selector: 'app-nueva-empresa',
  templateUrl: './nueva-empresa.component.html',
  styleUrls: ['./nueva-empresa.component.scss']
})
export class NuevaEmpresaComponent implements OnInit {

  nuevaEmpresa: FormGroup;
  submitted = false;
  empresa: any;

  @Input() correo: any;
  @Output() accionRealizada: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private adminEmpresasService: AdminEmpresasService, private loginService: LoginService, private modal: NgbModal) {
    this.empresa = {
      'nombre': this.route.snapshot.paramMap.get('nombre'),
      'provincia': this.route.snapshot.paramMap.get('provincia'),
      'localidad': this.route.snapshot.paramMap.get('localidad'),
      'calle': this.route.snapshot.paramMap.get('calle'),
      'cp': this.route.snapshot.paramMap.get('cp'),
      'cif': this.route.snapshot.paramMap.get('cif'),
      'tlf': this.route.snapshot.paramMap.get('tlf'),
      'email': this.route.snapshot.paramMap.get('email'),
      'dniRepresentante': this.route.snapshot.paramMap.get('dniRepresentante'),
      'nombreRepresentante': this.route.snapshot.paramMap.get('nombreRepresentante')
    };

    this.nuevaEmpresa = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      cif: ['', [Validators.required]],
      tlf: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      dniRepresentante: ['', [Validators.required, Validators.pattern]],
      nombreRepresentante: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }


  get formulario() { return this.nuevaEmpresa.controls; }

  //Manda crear una nueva empresa
  onSubmit() {
    this.submitted = true;
    if (this.nuevaEmpresa.invalid) {
      return;
    }

    this.adminEmpresasService.insertEmpresaSuscription(this.nuevaEmpresa.value);

    const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xs', backdrop: 'static' });
    modalRef.componentInstance.mensaje = 'Empresa añadida correctamente';
    modalRef.componentInstance.exito = true;
    this.onReset();

    setTimeout(function(){ window.location.reload(); }, 2000);
  }
  
  //Resetea el formulario
  onReset() {
    this.submitted = false;
    this.nuevaEmpresa.reset();
  }

  cancel() {
    this.onReset();
  }

  //Actualiza la página para cancelar la creación de una empresa
  refresh(){
    this.submitted = false;
    window.location.reload();
  }

}
