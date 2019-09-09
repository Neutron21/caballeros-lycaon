import { Component, OnInit, Input } from '@angular/core';
import { Miembro } from 'src/app/Models/miembro.model';
import { DataServices } from 'src/app/Services/dataServices';

@Component({
  selector: 'app-biker',
  templateUrl: './biker.component.html',
  styleUrls: ['./biker.component.css'],
  providers:[]
})
export class BikerComponent implements OnInit {
  
  @Input()
  miembro: Miembro;

  title: string = "Miembros"
  

  constructor(private dataServices: DataServices) { }

  ngOnInit() {
  }
  
 
}
