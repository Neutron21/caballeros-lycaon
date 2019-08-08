import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  mensaje: string = ""; 
  
  opA:number; 
  opB:number; 
  result:number;

  constructor() {   }

  ngOnInit() {
  }
  onModify(event: Event){
    this.mensaje = (<HTMLInputElement>event.target).value;
  }
  sumar(){
    this.result = Number(this.opA) + Number(this.opB)
    this.mensaje = "Fin";
  }
}
