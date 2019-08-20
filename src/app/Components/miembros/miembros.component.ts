import { Component, OnInit } from '@angular/core';
import { Miembro } from 'src/app/Models/miembro.model';
import { LoginService } from 'src/app/Services/login.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  styleUrls: ['./miembros.component.css']
})
export class MiembrosComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  email: string;
  miembros: Miembro[] = [
    { 
      email: "mike@correo.com", 
      nombres:"Miguel",
      aPat: "Hayashida",
      aMat: "Gomez",
      nickName: "Mike",
      uid: ""
    },
    {
      email: "albert@correo.com", 
      nombres:"Alberto",
      aPat: "Chavez",
      aMat: "Gallegos",
      nickName: "Handsome",
      uid: ""
    }
  ];
  
  ngOnInit() {
  }
  addUser(form: NgForm){
    let miembro1: Miembro = {
      email: form.value.email, 
      nombres:"Alberto",
      aPat: "Chavez",
      aMat: "Gallegos",
      nickName: "Handsome",
      uid: ""
    }
    if(this.loginService.isAutenticated()){
        this.loginService.addNewMember(miembro1 );
        alert("OK");
    } else{
      console.log("Sin sesion");
    }
    this.email = "";
    
  }

}
