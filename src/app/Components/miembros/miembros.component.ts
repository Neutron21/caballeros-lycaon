import { Component, OnInit } from '@angular/core';
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
  nombre: string;
  aPat: string;
  aMat: string;
  email: string;
  nickName: string;
  celular: number;
  errMsj: string = "";
  miembros: object[] = [];

  ngOnInit() {
    this.dataSevice.getMembers().subscribe(
      (members) => {
        if (members != null) {
          let miembros = Object.keys(members);
          for (var m of miembros) {
            var miembro = members[m];
            this.miembros.push(miembro);

          }
        }

      })
    console.log(this.miembros);
  }
  addUser(form: NgForm) {
    let miembro1 = {
      email: form.value.email,
      nombre: form.value.nombre,
      aPat: form.value.aPat,
      aMat: form.value.aMat,
      nickName: form.value.nickName,
      celular: form.value.celPhone,
    }
    if (!this.loginService.isAutenticated()) {
      this.errMsj = this.loginService.addNewMember(miembro1);

      console.log("errMsj: " + this.errMsj);
    } else {
      console.log("Sin sesion");
    }
    this.nombre = "";
    this.aPat = "";
    this.aMat = "";
    this.email = "";
    this.nickName = "";
    this.celular = null;

    this.getMsj();
  }
  getMsj() {
    console.log("errMsj: " + this.errMsj);
    return this.errMsj;
  }
  textValue(){
    let filter6=/^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
    // if(filter6.test()){

    // }
  }
  
}
