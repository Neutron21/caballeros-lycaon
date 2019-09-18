import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppConstant } from '../../const';
import * as moment from 'moment';
import { DataServices } from 'src/app/Services/dataServices';
import { Evento } from 'src/app/Models/evento.model';
import * as firebase from 'firebase';

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
  indice: number;
  perfil;

  async ngOnInit() {
    this.perfil = await this.dataServices.getPerfil();
  
    this.getEventos();
    this.getMiembros();
    
    // console.log(this.eventosArray);
    
  }

 async addEvent(form: NgForm) {
    console.log(form.value);
    if(form.value.tipo != "SELECCIONE" && form.value.fecha && form.value.ciudad && 
      form.value.lugar && form.value.presupuesto && form.value.distancia ){
      // console.log(form.value);
  
      let evento: Evento = new Evento(form.value.tipo, form.value.fecha, form.value.ciudad,
        form.value.lugar,form.value.presupuesto, form.value.distancia, form.value.url, this.key );
       
      let nkey: any = await this.dataServices.guardarEvento(evento);
        
      this.type = "SELECCIONE";
      this.fecha = "";
      this.ciudad = "";
      this.lugar = "";
      this.presupuesto = null;
      this.distancia = null;
      this.url = ""
      // await this.getEventos();
      // console.log(nkey);
      evento.key = nkey;
      this.eventosArray.push(evento);
      // console.log(this.eventosArray);
      
      
    }
    
    
  }
  
  getEventos(){
    this.eventosArray = [];
    this.dataServices.getEvents().subscribe(
      (eventos) => {
        if (eventos != null) {
          let rodadas = Object.keys(eventos);
          
          for (var m of rodadas) {
            var evento = eventos[m];
                evento.key = m;
            
            this.eventosArray.push(evento);
            
            this.eventosArray.sort(function (a, b) {
              if (a.fecha > b.fecha) {
                return 1;
              }
              if (a.fecha < b.fecha) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });

          }
        }

      })
    
    
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
  getMiembros(){
    this.dataServices.getMembers().subscribe(
      (members) => {
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

      })
  }
 
}
