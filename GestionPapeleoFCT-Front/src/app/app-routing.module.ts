import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent } from './componentes/alumno/alumno.component';
import { ListaCursosComponent } from './componentes/lista-cursos/lista-cursos.component';
import { LoginComponent } from './componentes/login/login.component';
import { NuevoAlumnoComponent } from './componentes/nuevo-alumno/nuevo-alumno.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'listaCursos', component: ListaCursosComponent},
  {path: 'alumno/:alumno', component: AlumnoComponent},
  {path: 'alumno', component: AlumnoComponent},
  {path: 'nuevoAlumno', component: NuevoAlumnoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
