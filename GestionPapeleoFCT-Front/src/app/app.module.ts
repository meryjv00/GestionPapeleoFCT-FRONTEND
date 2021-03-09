import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//COMPONENTES
import { MenuComponent } from './menu/menu.component';
import { NuevoAlumnoComponent } from './componentes/nuevo-alumno/nuevo-alumno.component';
import { ListaCursosComponent } from './componentes/lista-cursos/lista-cursos.component';
import { LoginComponent } from './componentes/login/login.component';
import { AlumnoComponent } from './componentes/alumno/alumno.component';
import { ListaEmpresasComponent } from './componentes/lista-empresas/lista-empresas.component';
import { NuevaEmpresaComponent } from './componentes/nueva-empresa/nueva-empresa.component';
import { EmpresaComponent } from './componentes/empresa/empresa.component';
import { RegistroUserComponent } from './componentes/registro-user/registro-user.component';
import { RegistroPersonaComponent } from './componentes/registro-persona/registro-persona.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { InfCentroComponent } from './componentes/inf-centro/inf-centro.component';
import { NuevoCursoComponent } from './componentes/nuevo-curso/nuevo-curso.component';
import { ActualizarCursoComponent } from './componentes/actualizar-curso/actualizar-curso.component';
import { AdministracionComponent } from './componentes/administracion/administracion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddAlumnoPracticaComponent } from './componentes/modal-add-alumno-practica/modal-add-alumno-practica.component';
import { ModalAlertaComponent } from './componentes/modal-alerta/modal-alerta.component';
import { DocMariaComponent } from './componentes/doc-maria/doc-maria.component';
import { ModalFotoAlumnoComponent } from './componentes/modal-foto-alumno/modal-foto-alumno.component';
import { DocLuisComponent } from './componentes/doc-luis/doc-luis.component';
import { DocDanielComponent } from './componentes/doc-daniel/doc-daniel.component';
import { RecPassComponent } from './componentes/rec-pass/rec-pass.component';
import { RecPassLinkComponent } from './componentes/rec-pass-link/rec-pass-link.component';

@NgModule({
  declarations: [
    AppComponent,
    NuevoAlumnoComponent,
    MenuComponent,
    ListaCursosComponent,
    LoginComponent,
    AlumnoComponent,
    ListaEmpresasComponent,
    NuevaEmpresaComponent,
    EmpresaComponent,
    RegistroUserComponent,
    RegistroPersonaComponent,
    OpcionesComponent,
    PerfilComponent,
    InfCentroComponent,
    PerfilComponent,
    NuevoCursoComponent,
    ActualizarCursoComponent,
    AdministracionComponent,
    ModalAddAlumnoPracticaComponent,
    ModalAlertaComponent,
    DocMariaComponent,
    ModalFotoAlumnoComponent,
    DocLuisComponent,
    DocDanielComponent,
    RecPassComponent,
    RecPassLinkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
