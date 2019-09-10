import { Component, OnInit } from '@angular/core';
import { Persona } from './persona.model';
import * as firebase from 'firebase';
import { Res } from './res.model';
import { LoginService } from './Services/login.services';
import { log } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   
})
export class AppComponent implements OnInit {
  
  isAut: boolean;
  title = 'borrador';
  personas: Persona[] = [];
  result:number;
  
  constructor(private loginService: LoginService){  }
  
  ngOnInit(): void {
    console.log("isAut "+this.isAut);
    
    firebase.initializeApp({
      apiKey: "AIzaSyAfIaS8uMlNSh9zDGXcw0DmTUF3dGuOnW0",
      authDomain: "caballeros-mc.firebaseapp.com",
      databaseURL: "https://caballeros-mc.firebaseio.com",
      projectId: "caballeros-mc",
      storageBucket: "caballeros-mc.appspot.com",
      messagingSenderId: "573088013461",
      appId: "1:573088013461:web:50d8e80338af60cc"
    })
    this.sesionActiva()
  }
 sesionActiva(){
  this.isAut = this.loginService.isAutenticated();
  return this.isAut;
 }
  sumaEjecucion(res:Res){
    this.result= Number(res.aOp) + Number(res.bOp);
  }
  onSesion(sesion: boolean){
    this.isAut = sesion;
  }
 
}
