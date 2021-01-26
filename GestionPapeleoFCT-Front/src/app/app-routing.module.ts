import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent } from './componentes/alumno/alumno.component';
import { ListaAlumnosComponent } from './componentes/lista-alumnos/lista-alumnos.component';
import { ListaCursosComponent } from './componentes/lista-cursos/lista-cursos.component';
import { LoginComponent } from './componentes/login/login.component';
import { NuevoAlumnoComponent } from './componentes/nuevo-alumno/nuevo-alumno.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'nuevoAlumno', component: NuevoAlumnoComponent},
  {path: 'listaAlumnos', component: ListaAlumnosComponent},
  {path: 'listaAlumnos/:curso', component: ListaAlumnosComponent},
  {path: 'alumno/:alumno', component: AlumnoComponent},
  {path: 'alumno', component: AlumnoComponent},
  {path: 'listaCursos', component: ListaCursosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
