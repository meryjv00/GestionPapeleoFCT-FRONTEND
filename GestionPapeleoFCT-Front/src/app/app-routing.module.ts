import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent } from './componentes/alumno/alumno.component';
import { ListaCursosComponent } from './componentes/lista-cursos/lista-cursos.component';
import { LoginComponent } from './componentes/login/login.component';
import { NuevoAlumnoComponent } from './componentes/nuevo-alumno/nuevo-alumno.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'listaCursos', component: ListaCursosComponent},
  {path: 'alumno', component: AlumnoComponent},
  {path: 'nuevoAlumno', component: NuevoAlumnoComponent},
  {path: 'perfil', component: PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
