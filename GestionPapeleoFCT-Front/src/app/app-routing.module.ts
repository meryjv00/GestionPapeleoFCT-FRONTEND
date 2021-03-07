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
import { AdministracionComponent } from './componentes/administracion/administracion.component';
import { InfCentroComponent } from './componentes/inf-centro/inf-centro.component';
import { NuevoCursoComponent } from './componentes/nuevo-curso/nuevo-curso.component';
import { ActualizarCursoComponent } from './componentes/actualizar-curso/actualizar-curso.component';
import { DocMariaComponent } from './componentes/doc-maria/doc-maria.component';
import { DocLuisComponent } from './componentes/doc-luis/doc-luis.component';
import { DocDanielComponent } from './componentes/doc-daniel/doc-daniel.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'nuevoAlumno', component: NuevoAlumnoComponent},
  {path: 'alumno', component: AlumnoComponent},
  {path: 'listaEmpresas', component: ListaEmpresasComponent},
  {path: 'empresa/:empresa', component: EmpresaComponent},
  {path: 'empresa', component: EmpresaComponent},
  {path: 'registroPersona', component: RegistroPersonaComponent},
  {path: 'registroUsuario', component: RegistroUserComponent},
  {path: 'infCentro', component: InfCentroComponent},
  {path: '', component: LoginComponent},
  {path: 'admin', component: AdministracionComponent},
  {path: 'perfil', component: PerfilComponent},
  // Rutas para cursos
  {path: 'listaCursos', component: ListaCursosComponent},
  {path: 'nuevoCurso', component: NuevoCursoComponent},
  {path: 'actualizarCurso', component: ActualizarCursoComponent},
  {path: 'docMaria', component: DocMariaComponent},
  {path: 'docLuis', component: DocLuisComponent},
  {path: 'docDaniel', component: DocDanielComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
