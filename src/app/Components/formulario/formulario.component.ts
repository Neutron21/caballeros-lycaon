import { Component, OnInit } from '@angular/core';
import { Persona } from '../../persona.model';
import { NgForm } from '@angular/forms';
import { DataServices } from 'src/app/Services/dataServices';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  
})
export class FormularioComponent implements OnInit {

  nombre: string;
  correo: string;
  textAreaMsj: string;
  actButton: boolean = true;
  badMail: boolean = true;

  constructor(private dataServices: DataServices) {
   
   }

  ngOnInit() {  }

  enviarMsj(form: NgForm){
  
    form.value.nombre;
    form.value.correo;
    form.value.textAreaMsj;
    let newMsj = {
      nombre : form.value.nombre,
      correo : form.value.correo,
      mensaje : form.value.textAreaMsj,
    }
    this.dataServices.guardarMensaje(newMsj);
    this.nombre = "";
    this.correo = "";
    this.textAreaMsj = "";
    console.log(form.value);
    
  }
  validaCampos(){
    
      this.actButton = this.nombre && this.textAreaMsj ? false : true;
      return this.actButton;
   
  }
  validaMail(){
      
    this.badMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.correo); 

  }
  
 
}
