import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonaComponent } from './persona/persona.component';
import { FormularioComponent } from './formulario/formulario.component';
import { PersonaFormComponent } from './persona-form/persona-form.component';
import { Logger } from './logger.service';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { LoginComponent } from './Components/login/login.component';
import { CarruselComponent } from './Components/carrusel/carrusel.component';
import { DescripcionComponent } from './Components/descripcion/descripcion.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoaderComponent } from './Components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    FormularioComponent,
    PersonaFormComponent,
    NavBarComponent,
    LoginComponent,
    CarruselComponent,
    DescripcionComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [Logger],
  bootstrap: [AppComponent]
})
export class AppModule { }
