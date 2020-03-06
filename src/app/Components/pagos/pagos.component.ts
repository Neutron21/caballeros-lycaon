import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServices } from 'src/app/Services/dataServices';
import * as moment from 'moment';
import { AppConstant } from '../../const';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  hoy = new Date();
  yyyy = this.hoy.getFullYear();
  mm = this.hoy.getMonth();
  dd = this.hoy.getDate();
  maxYear = this.yyyy+1;

  minDate = moment(new Date()).format('YYYY-MM-DD');
  maxDate = moment(new Date(this.maxYear, this.mm, this.dd)).format('YYYY-MM-DD');

  tipos = AppConstant.TYPE_EVENT;
  loading: boolean;
  pagosArray = [];
  eventosArray = [];
  errorArray = [];

  nombre: string;
  fecha: string;
  monto: number;
  comentarios: string = "";
  pago = {
    nombrePago: "",
    fechaPago: "",
    montoPago: null,
    lugarPago:  "",
    id: "",
  };
  
  perfil;
  data = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
  headElements = ['Nombre', 'Monto', 'Fecha', 'Lugar'];
  showform: boolean;
  constructor(private dataServices: DataServices) { 
    this.loading = true;
  }
      
   async ngOnInit() {
    this.perfil = await this.dataServices.getPerfil();
    this.loading = false;
    this.showform = false;
    this.getRegistros();
  }
  async getRegistros(){
    let pagos = await this.dataServices.getPagos();
    let fechaEvento;
    console.log("events", pagos);
    if (pagos != null) {
      let registroPagos = Object.keys(pagos);
      for (var i of registroPagos) {
        var evento = pagos[i];
            evento.key = i;

        fechaEvento = new Date(evento.fecha);
        
        if (evento.detalle) {
          evento.data = [];
          // console.log("no esta vacio");
          let detallePagos = Object.keys(evento.detalle);
          for (var i of detallePagos) {
            var detalle = evento.detalle[i];
              detalle.key = i;
              // console.log("detalle", detalle);
              evento.data.push(detalle);
              }
        }
        // if (this.hoy > fechaEvento) {
          
        //   //  this.historialArray.push(evento);
          
        // } else {

        //   this.pagosArray.push(evento);
        // }
        this.pagosArray.push(evento);

      }
      console.log(this.pagosArray);
      // this.orderArray(this.pagosArray);
      // this.orderArray(this.historialArray);
    }
    
  }
  addEvent(form: NgForm){
   
    if (form.value.nombre && form.value.fecha && form.value.monto) {
      let newEvent = {
        nombre: form.value.nombre,
        fecha: form.value.fecha,
        monto: form.value.monto,
        comentarios: form.value.comentarios,
        detalle: []
      }
      console.log("newEvent", newEvent);
      this.dataServices.guardarPago(newEvent);
      this.newEvent();
      this.getRegistros();
    } else {
      
      this.testValues()
    }

  }
  edithPlan(plan){
    console.log(plan);
    // this.type = plan.type;
    // this.fecha = plan.fecha;
    // this.ciudad = plan.ciudad;
    // this.lugar = plan.lugar;
    // this.presupuesto = plan.presupuesto;
    // this.distancia = plan.distancia;
    // this.url = plan.url;
    // this.key = plan.key;
    // this.comentarios = plan.comentarios;
    
  }

  delAuxPlan(index, key, lugar){
    // this.indice = index;
    // this.keyAux = key;
    // this.lugarAux = lugar
  }
  newEvent(){
    
    this.nombre = "";
    this.fecha = "";
    this.monto = null;
    this.comentarios = "";

  }
  showAddPay(){
    this.showform = !this.showform;
    this.cleanFormPago();
  }
  cleanFormPago(){
    this.pago = {
      nombrePago: "",
      fechaPago: "",
      montoPago: null,
      lugarPago:  "",
      id: "",
    };
  }
  addPAy(form: NgForm, key, indice){
    debugger
    console.log(form.value);
    
    if (form.value.nombrePago && form.value.fechaPago && form.value.montoPago) {
      let newPay = {
        nombre: form.value.nombrePago,
        fecha: form.value.fechaPago,
        monto: form.value.montoPago,
        lugar: form.value.lugarPago,
        id: key,
      }
      // console.log("newEvent", newPay);
      // console.log("pagosArray", this.pagosArray);
      // console.log("pagosArray", this.pagosArray[indice]);
      console.log("pagosArray", this.pagosArray[indice].data);
      this.pagosArray[indice].data.push(newPay);
      // this.dataServices.updatePago(newPay);
      // this.newEvent();
      this.cleanFormPago();
      
      
        } else {
      this.testValues()
    }
  }
  inputForm(tipo){

    switch (tipo) {
      case "nombre":
        if (this.nombre) { 
          this.errorArray[0] = false;
        }
        break;
      case "fecha":
        if (this.fecha) {
          this.errorArray[1] = false;
        }
        break;
      case "monto": 
        if (this.monto) {
            this.errorArray[2] = false;
        }
        break;
    
    }
 
    
  }
  testValues(){

    if (this.nombre) {
      this.errorArray[0] = false;
    } else {
      this.errorArray[0] = true;
    }
    if (this.fecha) {
      this.errorArray[1] = false;
    } else {
      this.errorArray[1] = true;
    }
    if (this.monto) {
      this.errorArray[2] = false;
    } else {
      this.errorArray[2] = true;
    }
  }
}
