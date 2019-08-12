import { Component, OnInit } from '@angular/core';
import { Persona } from './persona.model';
import { PersonasService } from './personas.service';
import { Res } from './res.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ PersonasService ]
})
export class AppComponent implements OnInit {
  
  title = 'borrador';
  personas: Persona[] = [];
  result:number;
  
  constructor(private personasService: PersonasService){  }
  
  ngOnInit(): void {
    this.personas = this.personasService.personas;
  }
 
  sumaEjecucion(res:Res){
    this.result= Number(res.aOp) + Number(res.bOp);
  }
 
}
