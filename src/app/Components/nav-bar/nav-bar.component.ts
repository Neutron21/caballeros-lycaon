import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/Services/login.services';
import * as $ from 'jquery';
import { DataServices } from 'src/app/Services/dataServices';
import { log } from 'util';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  @Input() sesion: boolean;
  
  constructor(private loginService: LoginService,
              private dataService: DataServices) { }

  perfil;

  async ngOnInit() {
    // this.sesionActiva()
    // this.sesion 
    // this.perfil = await this.dataService.getPerfil();
    // console.log(this.perfil);
  // let perfil = await this.isAdmin();
  // console.log(perfil);
  
  }
//   async isAdmin(){
//   this.perfil = await this.dataService.getPerfil();
//   console.log(this.perfil);
//   if (this.perfil && this.perfil.admin) {
    
//     return this.perfil;
//   }
//  }
  sesionActiva(){
    return this.loginService.isAutenticated();
    // console.log(this.isAut)
   }
  cerrarSesion(){
    this.loginService.logout();
    this.hideMenu();
  }
  hideMenu(){
    $( "#navbarSupportedContent" ).removeClass( "show" )
  }
}
