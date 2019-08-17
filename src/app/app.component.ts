import { Component, OnInit } from '@angular/core';
import { Persona } from './persona.model';
import * as firebase from 'firebase';
import { Res } from './res.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   
})
export class AppComponent implements OnInit {
  
  title = 'borrador';
  personas: Persona[] = [];
  result:number;
  
  constructor(){  }
  
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyAfIaS8uMlNSh9zDGXcw0DmTUF3dGuOnW0",
      authDomain: "caballeros-mc.firebaseapp.com",
    })
  }
 
  sumaEjecucion(res:Res){
    this.result= Number(res.aOp) + Number(res.bOp);
  }
 
}
