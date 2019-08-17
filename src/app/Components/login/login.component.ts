import { Component, OnInit } from '@angular/core';
import { DataServices } from '../../Services/dataServices'
import { Login } from '../../Models/login.model'
import { NgForm } from '@angular/forms';
import { LoginService } from './login.services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

  correo:string;
  password:string;
  personas: Login[] = [
    new Login("Juan", "Pérez"),
    new Login("Laura", "Juárez")
];
  constructor(private dataServices: DataServices,
              private loginService: LoginService) { }

  ngOnInit() {
  }

  loginSystem(form: NgForm){
    this.correo = form.value.email;
    this.password = form.value.password;

    console.log("this.correo "+this.correo)
    console.log("this.password "+this.password)
    
      alert("logeando");
      let login1 = new Login(this.correo, this.password);
      this.personas.push(login1);
      
      // this.dataServices.guardarLogin(this.personas);

   
    
  }
}
