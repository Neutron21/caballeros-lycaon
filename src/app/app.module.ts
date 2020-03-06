import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonaComponent } from './persona/persona.component';
import { FormularioComponent } from './Components/formulario/formulario.component';
import { PersonaFormComponent } from './persona-form/persona-form.component';
import { Logger } from './logger.service';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { LoginComponent } from './Components/login/login.component';
import { CarruselComponent } from './Components/carrusel/carrusel.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoaderComponent } from './Components/loader/loader.component';
import { RaizComponent } from './Components/raiz/raiz.component';
import { QuienesComponent } from './Components/quienes/quienes.component';
import { TipsComponent } from './Components/tips/tips.component';
import { DataServices } from './Services/dataServices'
import { StorageService } from './Services/storage.services'
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './Services/login.services';
import { Guardian } from './Services/guardian.service';
import { IntinerarioComponent } from './Components/intinerario/intinerario.component';
import { MiembrosComponent } from './Components/miembros/miembros.component';
import { BikerComponent } from './Components/biker/biker.component';
import { MiPerfilComponent } from './Components/mi-perfil/mi-perfil.component';
import { ViewMemberComponent } from './Components/view-member/view-member.component';
import { MotoComponent } from './Components/moto/moto.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MensajesComponent } from './Components/mensajes/mensajes.component';
import { PagosComponent } from './Components/pagos/pagos.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    FormularioComponent,
    PersonaFormComponent,
    NavBarComponent,
    LoginComponent,
    CarruselComponent,
    FooterComponent,
    LoaderComponent,
    RaizComponent,
    QuienesComponent,
    TipsComponent,
    IntinerarioComponent,
    MiembrosComponent,
    BikerComponent,
    MiPerfilComponent,
    ViewMemberComponent,
    MotoComponent,
    MensajesComponent,
    PagosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [Logger, DataServices, StorageService, LoginService, Guardian],
  bootstrap: [AppComponent]
})
export class AppModule { }
