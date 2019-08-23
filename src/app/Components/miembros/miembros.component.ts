import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.services';
import { NgForm } from '@angular/forms';
import { DataServices } from 'src/app/Services/dataServices';
import { log } from 'util';
import { Miembro } from 'src/app/Models/miembro.model';
import { ActivatedRoute } from '@angular/router';

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
  miembros: Miembro[] = [];
  id: string;

  ngOnInit() {
    this.getMiembros()
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
    // setTimeout(() => {
    //   this.getMiembros();
    //   }, 1000);
    
    this.getMsj();
  }
  getMsj() {
    console.log("errMsj: " + this.errMsj);
    return this.errMsj;
  }
  getMiembros(){
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
  }
  // onlyText(event){
     /* FORMA 1 */
    // let value = event.target.value;
    
    
    //     var tam = value.length-1;
    //     var ultimoChar = value.charAt(tam);
    //     let filtro=/^[A-Za-z\á\é\í\ó\ú\´\.\s\xF1\xD1]+$/;
    //     if(!filtro.test(ultimoChar)){ 
    //       console.log("Error")
    //       console.log(false);
    //         value=value.replace(ultimoChar, '');
            
    //     }
    //     this.nombre=value;
       
    /* FORMA 2 */

    // console.log(event.target.id);
    // let filtro=/^[A-Za-z\á\é\í\ó\ú\´\.\s\xF1\xD1]+$/;
    // let arrayInput = event.target.value.split("");
    // let aux = arrayInput[arrayInput.length-1];
    
    // let textInput = event.target.value;
    // let textExit="";
    // for(let index=0;  index < arrayInput.length-1; index++){
    //   textExit += textExit
    // }
    // console.log("textExit: "+textExit);
      
    //     if(filtro.test(aux)){
    //       textExit += aux;
    //       console.log("OK");
    //       console.log(aux);
    //     }
      
    // this.nombre = textExit
    
  // }
  
}
