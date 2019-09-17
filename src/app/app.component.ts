import { Component, OnInit } from '@angular/core';
import { Persona } from './persona.model';
import * as firebase from 'firebase';
import { Res } from './res.model';
import { LoginService } from './Services/login.services';
import { log } from 'util';
import { DataServices } from './Services/dataServices';

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
  perfil;
  
  constructor(private loginService: LoginService,
              private dataService: DataServices){  }
  
  async ngOnInit(){
    
    firebase.initializeApp({
      apiKey: "AIzaSyAfIaS8uMlNSh9zDGXcw0DmTUF3dGuOnW0",
      authDomain: "caballeros-mc.firebaseapp.com",
      databaseURL: "https://caballeros-mc.firebaseio.com",
      projectId: "caballeros-mc",
      storageBucket: "caballeros-mc.appspot.com",
      messagingSenderId: "573088013461",
      appId: "1:573088013461:web:50d8e80338af60cc"
    })
    // this.perfil = await this.dataService.getPerfil();
    // if (this.perfil) {
    //   this.sesionActiva()
    // }
    this.sesionActiva()
    console.log("isAut "+this.isAut);
  }
 async sesionActiva(){
    
   let user = await new Promise((resolve,reject)=>{
    firebase.auth().onAuthStateChanged(function(user) {
      
      if (user) {
       resolve(user);
        // User is signed in.
      } else {
        // resolNo user is signed in.
        resolve(false);
      }
    }
    
    );
   }) ;

   this.isAut = user ? user.refreshToken : false;
   this.loginService.setToken(user.refreshToken);
 }
  sumaEjecucion(res:Res){
    this.result= Number(res.aOp) + Number(res.bOp);
  }
  onSesion(sesion: boolean){
    this.isAut = sesion;
  }
 
}
