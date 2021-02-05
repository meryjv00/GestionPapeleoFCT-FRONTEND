
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.scss']
})
export class NuevoAlumnoComponent implements OnInit {
  nuevoAlumno: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.nuevoAlumno = this.formBuilder.group({
      a: ['', [Validators.required, Validators.email]],
      b: ['', [Validators.required, Validators.minLength(4)]],
      c: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
  }

  get formulario() { return this.nuevoAlumno.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.nuevoAlumno.invalid) {
      return;
    }

    
    alert("Alumno añadido");
    this.onReset();
  }
  onReset() {
    this.submitted = false;
    this.nuevoAlumno.reset();
  }

}




