import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppConstant } from '../../const';
import * as moment from 'moment';
import { DataServices } from 'src/app/Services/dataServices';
import { Evento } from 'src/app/Models/evento.model';

@Component({
  selector: 'app-intinerario',
  templateUrl: './intinerario.component.html',
  styleUrls: ['./intinerario.component.css']
})
export class IntinerarioComponent implements OnInit {

  constructor(private dataServices: DataServices) { }

  type: string = "SELECCIONE";
  tipos = AppConstant.TYPE_EVENT;
  fecha: string;
  ciudad: string;
  lugar: string;
  presupuesto: number;
  distancia: number;
  url: string

  hoy = new Date();
  yyyy = this.hoy.getFullYear();
  mm = this.hoy.getMonth();
  dd = this.hoy.getDate();
  maxYear = this.yyyy+1;

  minDate= moment(new Date()).format('YYYY-MM-DD');
  maxDate = moment(new Date(this.maxYear, this.mm, this.dd)).format('YYYY-MM-DD');

  eventosArray = [];
  

  ngOnInit() {
    this.getEventos();
    console.log(this.eventosArray);
    
  }

  addEvent(form: NgForm) {
    console.log(form.value);
    if(form.value.tipo != "SELECCIONE" && form.value.fecha && form.value.ciudad && 
      form.value.lugar && form.value.presupuesto && form.value.distancia ){
      console.log(form.value);
  
      let evento: Evento = new Evento(form.value.tipo, form.value.fecha, form.value.ciudad,
        form.value.lugar,form.value.presupuesto, form.value.distancia, form.value.url );
        this.dataServices.guardarEvento(evento);
      this.type = "SELECCIONE";
      this.fecha = "";
      this.ciudad = "";
      this.lugar = "";
      this.presupuesto = null;
      this.distancia = null;
      this.url = ""
    }
    
    
  }
  
  getEventos(){
    this.dataServices.getEvents().subscribe(
      (eventos) => {
        if (eventos != null) {
          let rodadas = Object.keys(eventos);
          
          
          for (var m of rodadas) {
            var evento = eventos[m];
                evento.key = m;
            
            this.eventosArray.push(evento);

          }
        }

      })
  }
  
  edithPlan(key){
    console.log(key);
    
  }
  delPlan(key, lugar){
    this.dataServices.deleteEvent(key, lugar);
    console.log(key);
  }
}
