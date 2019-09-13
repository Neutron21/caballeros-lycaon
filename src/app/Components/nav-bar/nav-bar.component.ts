import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/Services/login.services';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  @Input() sesion: boolean;
  
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    // this.sesionActiva()
  }
 
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
