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
import { AdministracionComponent } from './componentes/administracion/administracion.component';

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
    AdministracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
