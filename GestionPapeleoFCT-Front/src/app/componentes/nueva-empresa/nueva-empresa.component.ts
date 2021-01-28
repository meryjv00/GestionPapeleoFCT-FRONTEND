import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminEmpresasService } from "src/app/servicios/admin-empresas.service";
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

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

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,private router: Router,private adminEmpresasService: AdminEmpresasService,private loginService: LoginService) {
    this.empresa = {
      'nombre': this.route.snapshot.paramMap.get('nombre'),
      'provincia': this.route.snapshot.paramMap.get('provincia'),
      'localidad': this.route.snapshot.paramMap.get('localidad'),
      'calle': this.route.snapshot.paramMap.get('calle'),
      'cp': this.route.snapshot.paramMap.get('cp'),
      'cif': this.route.snapshot.paramMap.get('cif'),
      'tlf': this.route.snapshot.paramMap.get('tlf'),
      'email': this.route.snapshot.paramMap.get('email')
    };

    this.nuevaEmpresa = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      cif: ['', [Validators.required]],
      tlf: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
    
  }

  ngOnInit(): void {
  }


  get formulario() { return this.nuevaEmpresa.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.nuevaEmpresa.invalid) {
      return;
    }


    this.adminEmpresasService.insertEmpresaSuscription(this.nuevaEmpresa.value);
    
    alert("Empresa añadida");
    this.onReset();
  }
  onReset() {
    this.submitted = false;
    this.nuevaEmpresa.reset();
  }

  cancel(){
    this.onReset();
  }

}
