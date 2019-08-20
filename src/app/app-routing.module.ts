import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CarruselComponent } from './Components/carrusel/carrusel.component';
import { RaizComponent } from './Components/raiz/raiz.component';
import { QuienesComponent } from './Components/quienes/quienes.component';
import { TipsComponent } from './Components/tips/tips.component';
import { IntinerarioComponent } from './Components/intinerario/intinerario.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { MiembrosComponent } from './Components/miembros/miembros.component';
import { Guardian } from './Services/guardian.service';

const routes: Routes = [
  { path: '', component: RaizComponent },
  { path: 'login', component: LoginComponent },
  { path: 'galeria', component: CarruselComponent }, 
  { path: 'quienes-somos', component: QuienesComponent }, 
  { path: 'tips', component: TipsComponent }, 
  // Rutas con sesion
  { path: 'intinerario', component: IntinerarioComponent, canActivate: [Guardian] }, 
  { path: 'miPerfil', component: PerfilComponent, canActivate: [Guardian]}, 
  { path: 'miembros', component: MiembrosComponent, }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
