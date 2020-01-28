import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  
  galery: string[] = [];
  x: number = 0;
  constructor() { 
    
    this.x = window.innerWidth;
    let ruta = "";
    for(let i = 0; i < 15; i ++){
      ruta = "../../../assets/galeria/galery"+i+".jpeg";
      this.galery.push(ruta);
    }
    // console.log(this.galery);
    
  }

  ngOnInit() {
    
    // console.log("width",this.x);
     }
     
     @HostListener('window:resize', ['$event'])
     onResize(event) {
       this.x = window.innerWidth;
     }
}
