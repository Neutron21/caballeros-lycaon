import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../persona.model';
import { PersonasService } from '../personas.service';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html',
  styleUrls: ['./persona-form.component.css']
})
export class PersonaFormComponent implements OnInit {

  @Input () persona :Persona;
  @Input () indice :number;
  constructor(private personasService: PersonasService) { }

  ngOnInit() {
  }
  emitirSaludo(){
     this.personasService.saludar.emit(this.indice)
  }
}
