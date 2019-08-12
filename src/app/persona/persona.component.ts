import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Res } from '../res.model';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  mensaje: string = ""; 
  @Output() res = new EventEmitter<Res>();
  opA:string;
  opB:string;
  
  constructor() {   }

  ngOnInit() {
  }
  onModify(event: Event){
    this.mensaje = (<HTMLInputElement>event.target).value;
  }
  sumar(){
    let res1 = new Res(this.opA, this.opB);
    this.res.emit(res1)
    this.opA = "";
    this.opB = "";
  }
}
