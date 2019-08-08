import { Component } from '@angular/core';
import { Persona } from './persona.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'borrador';
  personas: Persona[] = [new Persona("Juan", "Pérez"), new Persona("Laura", "Juárez")];
  nombreInput:string;
  apellidoInput:string;

  onAddPersona(){
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    this.personas.push(persona1);
    this.nombreInput = "";
    this.apellidoInput = "";
  }
}
