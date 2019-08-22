import { Component, OnInit, Input } from '@angular/core';
import { Miembro } from 'src/app/Models/miembro.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-biker',
  templateUrl: './biker.component.html',
  styleUrls: ['./biker.component.css']
})
export class BikerComponent implements OnInit {
  
  @Input()
  miembro: Miembro;

  title: string = "Miembros"

  constructor() { }

  ngOnInit() {
  }
  eliminarUsuer(uid: string){
    
    console.log("eliminarUsuer() OK!");
    console.log("Uid: "+uid);
    
  }
}
