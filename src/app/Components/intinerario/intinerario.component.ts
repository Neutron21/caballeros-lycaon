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
  url: string;
  key: string = "";

  hoy = new Date();
  yyyy = this.hoy.getFullYear();
  mm = this.hoy.getMonth();
  dd = this.hoy.getDate();
  maxYear = this.yyyy+1;

  minDate= moment(new Date()).format('YYYY-MM-DD');
  maxDate = moment(new Date(this.maxYear, this.mm, this.dd)).format('YYYY-MM-DD');

  eventosArray = [];
  miembros = [];
  editar: boolean = false;
  keyAux: string;
  lugarAux: string;

  ngOnInit() {
    this.getEventos();
    this.getMiembros();
    this.eventosArray = this.dataServices.eventos;
    console.log(this.eventosArray);
    
  }

 async addEvent(form: NgForm) {
    console.log(form.value);
    if(form.value.tipo != "SELECCIONE" && form.value.fecha && form.value.ciudad && 
      form.value.lugar && form.value.presupuesto && form.value.distancia ){
      console.log(form.value);
  
      let evento: Evento = new Evento(form.value.tipo, form.value.fecha, form.value.ciudad,
        form.value.lugar,form.value.presupuesto, form.value.distancia, form.value.url, this.key );
       
     await this.dataServices.guardarEvento(evento);
        
      this.type = "SELECCIONE";
      this.fecha = "";
      this.ciudad = "";
      this.lugar = "";
      this.presupuesto = null;
      this.distancia = null;
      this.url = ""
      
      this.eventosArray = await this.dataServices.eventos;
    }
    
    
  }
  
  getEventos(){
    
    this.dataServices.llenarEventos();
    
    
  }
  
  edithPlan(plan){
    console.log(plan);
    this.type = plan.type;
    this.fecha = plan.fecha;
    this.ciudad = plan.ciudad;
    this.lugar = plan.lugar;
    this.presupuesto = plan.presupuesto;
    this.distancia = plan.distancia;
    this.url = plan.url;
    this.key = plan.key;
    
  }
  delAuxPlan(key, lugar){
    this.keyAux = key;
    this.lugarAux = lugar
  }
 async delPlan(){
    await this.dataServices.deleteEvent(this.keyAux, this.lugarAux);
    console.log(this.keyAux);
    
      this.eventosArray = await this.dataServices.eventos;
    
    console.log(this.eventosArray);
  }
  newEvent(){
    this.type = "SELECCIONE";
    this.fecha = "";
    this.ciudad = "";
    this.lugar = "";
    this.presupuesto = null;
    this.distancia = null;
    this.url = "";
    this.key = "";
  }
  getMiembros(){
    this.dataServices.getMembers().subscribe(
      (members) => {
        if (members != null) {
          let miembros = Object.keys(members);
          for (var m of miembros) {
            var miembro = members[m];
            this.miembros.push(miembro);

          }
        }

      })
  }

}
