import { Component } from '@angular/core';
import { Persona } from './persona.model';
import { Res } from './res.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'borrador';
  personas: Persona[] = [new Persona("Juan", "Pérez"), new Persona("Laura", "Juárez")];
  result:number;

  onPersonaAgregada(persona:Persona){
    
    this.personas.push(persona);
  }
  sumaEjecucion(res:Res){
    this.result= Number(res.aOp) + Number(res.bOp);
  }
 
}
