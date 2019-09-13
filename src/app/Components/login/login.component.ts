import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataServices } from '../../Services/dataServices';
import { Login } from '../../Models/login.model';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../Services/login.services';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

  @Output() infoSession = new EventEmitter<boolean>();
  correo: string;
  password: string;
  msj: string;
  personas: Login[] = [
    new Login("Juan", "Pérez"),
    new Login("Laura", "Juárez")
  ];
  constructor(private dataServices: DataServices,
              private loginService: LoginService) { }

  ngOnInit() {
    $( "#navbarSupportedContent" ).removeClass( "show" );
  }

  loginSystem(form: NgForm) {

    if (form.value.email == "" || form.value.password == "") {
      this.msj = "Usuario ó password no válido!"
    } else {
      this.correo = form.value.email;
      this.password = form.value.password;

      this.loginService.login(this.correo, this.password);
      // Damos un lapso para que se detecte la autenticacion del usuario
      setTimeout(() => {
      this.checkLogin();
      }, 1000);

    }
  }
  checkLogin() {
    if (!this.loginService.isAutenticated()) {
      this.msj = "Usuario ó password no válido!"
    }
  }
  modifyInput() {
    this.msj = "";
  }
}
