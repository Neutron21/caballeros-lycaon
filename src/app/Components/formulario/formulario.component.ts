import { Component, OnInit } from '@angular/core';
import { Persona } from '../../persona.model';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  
})
export class FormularioComponent implements OnInit {

  
  nombreInput:string;
  apellidoInput:string;

  constructor() {
   
   }

  ngOnInit() {  }


  
 
}
