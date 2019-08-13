import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CarruselComponent } from './Components/carrusel/carrusel.component';
import { DescripcionComponent } from './Components/descripcion/descripcion.component';
import { RaizComponent } from './Components/raiz/raiz.component';

const routes: Routes = [
  { path: '', component: RaizComponent },
  { path: 'login', component: LoginComponent },
  { path: 'galeria', component: CarruselComponent }, 
  { path: 'descripcion', component: DescripcionComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
