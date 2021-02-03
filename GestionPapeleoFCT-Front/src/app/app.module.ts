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
import { OpcionesComponent } from './opciones/opciones.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    NuevoAlumnoComponent,
    MenuComponent,
    ListaCursosComponent,
    LoginComponent,
    AlumnoComponent,
    OpcionesComponent,
    PerfilComponent
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
