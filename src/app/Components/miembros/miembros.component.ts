import { Component, OnInit } from '@angular/core';
import { Miembro } from 'src/app/Models/miembro.model';

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  styleUrls: ['./miembros.component.css']
})
export class MiembrosComponent implements OnInit {

  constructor() { }
  miembros: Miembro[] = [
    { 
      email: "mike@correo.com", 
      nombres:"Miguel",
      aPat: "Hayashida",
      aMat: "Gomez",
      nickName: "Mike" 
    },
    {
      email: "albert@correo.com", 
      nombres:"Alberto",
      aPat: "Chavez",
      aMat: "Gallegos",
      nickName: "Handsome" 
    }
  ];
  
  ngOnInit() {
  }
  addUser(){
    alert("OK");
  }

}
