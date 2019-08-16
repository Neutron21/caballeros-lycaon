import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CarruselComponent } from './Components/carrusel/carrusel.component';
import { RaizComponent } from './Components/raiz/raiz.component';
import { QuienesComponent } from './Components/quienes/quienes.component';
import { TipsComponent } from './Components/tips/tips.component';

const routes: Routes = [
  { path: '', component: RaizComponent },
  { path: 'login', component: LoginComponent },
  { path: 'galeria', component: CarruselComponent }, 
  { path: 'quienes-somos', component: QuienesComponent }, 
  { path: 'tips', component: TipsComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
