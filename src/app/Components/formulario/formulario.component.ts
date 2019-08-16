import { Component, OnInit } from '@angular/core';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  
})
export class FormularioComponent implements OnInit {

  
  nombreInput:string;
  apellidoInput:string;

  constructor(private personasService: PersonasService) {
    this.personasService.saludar.subscribe(
      (indice: number) => { alert("Indice: "+indice)}
    ); 
   }

  ngOnInit() {  }

  onAddPersona(){
    
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    // this.personaCreada.emit(persona1);
    this.personasService.agregarPersona(persona1);
    this.nombreInput = "";
    this.apellidoInput = "";
  }
  
 
}
