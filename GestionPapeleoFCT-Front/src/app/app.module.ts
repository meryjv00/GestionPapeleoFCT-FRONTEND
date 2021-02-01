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
import { RegistroUserComponent } from './componentes/registro-user/registro-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NuevoAlumnoComponent,
    MenuComponent,
    ListaCursosComponent,
    LoginComponent,
    ListaAlumnosComponent,
    AlumnoComponent,
    RegistroUserComponent
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
