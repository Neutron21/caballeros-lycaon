import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo:string;
  password:string;

  constructor() { }

  ngOnInit() {
  }
  loginSystem(){
    console.log("this.correo "+this.correo)
    console.log("this.password "+this.password)
    if (this.correo !=undefined && this.password !=undefined 
        && this.correo !="" && this.password !="") {
      alert("logeando");
    } else {
      alert("Debes ingresar correo y password");
    }
    
  }
}
