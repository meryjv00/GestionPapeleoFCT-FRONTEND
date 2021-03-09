import { Component, OnInit } from '@angular/core';
import { EnvEmailService } from 'src/app/servicios/env-email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalAlertaComponent } from '../modal-alerta/modal-alerta.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rec-pass',
  templateUrl: './rec-pass.component.html',
  styleUrls: ['./rec-pass.component.scss']
})
export class RecPassComponent implements OnInit {

  nuevoRec: FormGroup;
  submitted = false;
  message: string;
  constructor(private formBuilder: FormBuilder, private router: Router, private EnvEmailService: EnvEmailService, private modal: NgbModal) { 
    this.nuevoRec = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]]
    });
    this.message = "";
  }
  get formulario() { return this.nuevoRec.controls;}
  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.nuevoRec.invalid) {
      return;
    }
    let datosUsuario = this.nuevoRec.value;
    const email = datosUsuario.email;
    this.envEmail(email);
    this.onReset();
  }
  
  envEmail(email: any) {
    this.EnvEmailService.RecPass(email).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error.error.message);
        const modalRef = this.modal.open(ModalAlertaComponent, { size: 'xl', backdrop: 'static' });
        modalRef.componentInstance.mensaje = error.error.message;
        modalRef.componentInstance.exito = false;
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.nuevoRec.reset();
  }
}
