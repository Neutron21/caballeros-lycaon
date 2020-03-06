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

  loading: boolean;

  type: string = "SELECCIONE";
  tipos = AppConstant.TYPE_EVENT;
  fecha: string;
  ciudad: string;
  lugar: string;
  presupuesto: number;
  distancia: number;
  url: string;
  key: string = "";
  comentarios: string = "";

  hoy = new Date();
  yyyy = this.hoy.getFullYear();
  mm = this.hoy.getMonth();
  dd = this.hoy.getDate();
  maxYear = this.yyyy+1;

  minDate = moment(new Date()).format('YYYY-MM-DD');
  maxDate = moment(new Date(this.maxYear, this.mm, this.dd)).format('YYYY-MM-DD');

  mensajesArray = [];
  eventosArray = [];
  intinerarioArray = [];
  historialArray = [];
  miembros = [];
  editar: boolean = false;
  keyAux: string;
  lugarAux: string;
  indice: number;
  perfil;

  constructor(private dataServices: DataServices) { 
      this.loading = true;
  }

  async ngOnInit() {
    this.perfil = await this.dataServices.getPerfil();
    let mensajes = await this.dataServices.getMensajes();
    // console.log(mensajes);

    if (mensajes != null) {
      let mjs = Object.keys(mensajes);
      for (var m of mjs) {
        var evento = mensajes[m];
        
          evento.key = m;
          
          this.mensajesArray.push(evento);

      }
    }
  
    this.getEventos();
    this.getMiembros();
    this.loading = false;
    // console.log(this.eventosArray);
  }

 async addEvent(form: NgForm) {

    console.log(form.value);
    if(form.value.tipo != "SELECCIONE" && form.value.fecha && form.value.ciudad && 
      form.value.lugar && form.value.presupuesto && form.value.distancia ){
      // console.log(form.value);
    // debugger
      let evento: Evento = new Evento(form.value.tipo, form.value.fecha, form.value.ciudad,
        form.value.lugar,form.value.presupuesto, form.value.distancia, form.value.url, this.key, this.comentarios);
       
      let nkey: any = await this.dataServices.guardarEvento(evento);
      // debugger
      this.type = "SELECCIONE";
      this.fecha = "";
      this.ciudad = "";
      this.lugar = "";
      this.presupuesto = null;
      this.distancia = null;
      this.url = ""
      this.comentarios = "";
      // await this.getEventos();
      // console.log(nkey);
      evento.key = nkey;
      this.eventosArray.push(evento);
      // console.log(this.eventosArray);
      
      
    }
    
    
  }
  async getEventos(){
    let events = await this.dataServices.getEvents();
    let fechaEvento;
    
    if (events != null) {
      let rodadas = Object.keys(events);
      for (var m of rodadas) {
        var evento = events[m];
            evento.key = m;

        fechaEvento = new Date(evento.fecha);
        this.eventosArray.push(evento);
      
        if (this.hoy > fechaEvento) {
          
          this.historialArray.push(evento);
          
        } else {

          this.intinerarioArray.push(evento);
        }
      }
    
      this.orderArray(this.intinerarioArray);
      this.orderArray(this.historialArray);
    }
    
  }
  orderArray(array){
    array.sort(function (a, b) {
          
      if (a.fecha > b.fecha) {
        return 1;
      }
      if (a.fecha < b.fecha) {
        return -1;
      }
      
      return 0;
    });
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
    this.comentarios = plan.comentarios;
    
  }

  delAuxPlan(index, key, lugar){
    this.indice = index;
    this.keyAux = key;
    this.lugarAux = lugar
  }
 async delPlan(){
    await this.dataServices.deleteEvent(this.keyAux, this.lugarAux);
    // console.log(this.keyAux);
    this.eventosArray.splice(this.indice, 1);
      
    
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
 async getMiembros(){
    let members = await this.dataServices.getMembers()
      
        if (members != null) {
          let miembros = Object.keys(members);
          
          for (var m of miembros) {
            var miembro = {
                nickName: members[m].nickName,
                dayBirthday: moment(members[m].birthday).format('DD'),
                monthBirthday: moment(members[m].birthday).format('MMM'),
                numberMonth: moment(members[m].birthday).format('MM')
            }
            
            this.miembros.push(miembro);
            
            this.miembros.sort(function (a, b) {
              if (a.numberMonth > b.numberMonth) {
                return 1;
              }
              if (a.numberMonth < b.numberMonth) {
                return -1;
              }
              // a must be equal to b
              if (a.numberMonth == b.numberMonth) {
                if (a.dayBirthday > b.dayBirthday) {
                  return 1;
                }
                if (a.dayBirthday < b.dayBirthday) {
                  return -1;
                }
                return 0;
              }
              // return 0;
            });
            
          }
        }

  }
 
}
