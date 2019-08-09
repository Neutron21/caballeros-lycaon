import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Persona } from '../persona.model';
import { Logger } from '../logger.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @Output() personaCreada = new EventEmitter<Persona>(); 
  nombreInput:string;
  apellidoInput:string;

  constructor(private log:Logger) { }

  ngOnInit() {  }

  onAddPersona(){
    this.log.envMens("estamos en metodo onAddPersona()")
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    this.personaCreada.emit(persona1);
    this.nombreInput = "";
    this.apellidoInput = "";
  }
  
 
}
