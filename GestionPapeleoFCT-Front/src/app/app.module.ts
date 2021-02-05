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
import { ListaAlumnosComponent } from './componentes/lista-alumnos/lista-alumnos.component';
import { AlumnoComponent } from './componentes/alumno/alumno.component';
import { ListaEmpresasComponent } from './componentes/lista-empresas/lista-empresas.component';
import { NuevaEmpresaComponent } from './componentes/nueva-empresa/nueva-empresa.component';
import { EmpresaComponent } from './componentes/empresa/empresa.component';

import { RegistroUserComponent } from './componentes/registro-user/registro-user.component';
import { RegistroPersonaComponent } from './componentes/registro-persona/registro-persona.component';
@NgModule({
  declarations: [
    AppComponent,
    NuevoAlumnoComponent,
    MenuComponent,
    ListaCursosComponent,
    LoginComponent,
    ListaAlumnosComponent,
    AlumnoComponent,
    ListaEmpresasComponent,
    NuevaEmpresaComponent,
    EmpresaComponent
    RegistroUserComponent,
    RegistroPersonaComponent
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
