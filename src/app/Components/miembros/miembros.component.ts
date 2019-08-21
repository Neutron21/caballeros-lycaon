import { Component, OnInit } from '@angular/core';
import { Miembro } from 'src/app/Models/miembro.model';
import { LoginService } from 'src/app/Services/login.services';
import { NgForm } from '@angular/forms';
import { DataServices } from 'src/app/Services/dataServices';

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  styleUrls: ['./miembros.component.css']
})
export class MiembrosComponent implements OnInit {

  constructor(private loginService: LoginService,
              private dataSevice: DataServices) { }

  email: string;
  errMsj: string = "Error";
  miembros: Miembro[] = [
    { 
      email: "mike@correo.com", 
      nombre:"Miguel",
      aPat: "Hayashida",
      aMat: "Gomez",
      nickName: "Mike",
      uid: "",
      key:""
    },
    {
      email: "albert@correo.com", 
      nombre:"Alberto",
      aPat: "Chavez",
      aMat: "Gallegos",
      nickName: "Handsome",
      uid: "",
      key:""
    }
  ];
  
  ngOnInit() {
    this.dataSevice.getMembers().subscribe(
      (members)=>{
      console.log(members)
        })
  }
  addUser(form: NgForm){
    let miembro1: Miembro = {
      email: form.value.email, 
      nombre:"Alberto",
      aPat: "Chavez",
      aMat: "Gallegos",
      nickName: "Handsome",
      uid: "",
      key:""
    }
    if(this.loginService.isAutenticated()){
      this.errMsj = this.loginService.addNewMember(miembro1 );
      
      console.log("errMsj: "+this.errMsj);
    } else{
      console.log("Sin sesion");
    }
    this.email = "";
    this.getMsj();
  }
  getMsj(){
    console.log("errMsj: "+this.errMsj);
    return this.errMsj;
  }

}
