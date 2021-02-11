import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent } from './componentes/alumno/alumno.component';
import { ListaCursosComponent } from './componentes/lista-cursos/lista-cursos.component';
import { LoginComponent } from './componentes/login/login.component';
import { NuevoAlumnoComponent } from './componentes/nuevo-alumno/nuevo-alumno.component';
import { ListaEmpresasComponent } from './componentes/lista-empresas/lista-empresas.component';
import { EmpresaComponent } from './componentes/empresa/empresa.component';
import { RegistroPersonaComponent } from './componentes/registro-persona/registro-persona.component';
import { RegistroUserComponent } from './componentes/registro-user/registro-user.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { InfCentroComponent } from './componentes/inf-centro/inf-centro.component'

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'nuevoAlumno', component: NuevoAlumnoComponent},
  {path: 'alumno', component: AlumnoComponent},
  {path: 'listaCursos', component: ListaCursosComponent},
  {path: 'listaEmpresas', component: ListaEmpresasComponent},
  {path: 'empresa/:empresa', component: EmpresaComponent},
  {path: 'empresa', component: EmpresaComponent},
  {path: 'registroPersona', component: RegistroPersonaComponent},
  {path: 'registroUsuario', component: RegistroUserComponent},
  {path: 'infCentro', component: InfCentroComponent},
  {path: '', component: LoginComponent},
  {path: 'perfil', component: PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
