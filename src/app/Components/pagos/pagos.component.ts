import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServices } from 'src/app/Services/dataServices';
import { ModalService } from '../../Services/modal.services';
import * as moment from 'moment';
import { element } from 'protractor';


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
  minYear = this.yyyy-1;

  minDate = moment(new Date()).format('YYYY-MM-DD');
  maxDate = moment(new Date(this.maxYear, this.mm, this.dd)).format('YYYY-MM-DD');
  minDateYear = moment(new Date(this.minYear, this.mm, this.dd)).format('YYYY-MM-DD');
  
  loading: boolean;
  pagosArray = [];
  eventosArray = [];
  errorArray = {
    nombre: false,
    fecha: false,
    monto: false,
    nombrePago: false,
    fechaPago: false,
    montoPago: false,
    lugarPago: false,
  };

  nombre: string;
  fecha: string;
  monto: number;
  comentarios: string = "";
  detalleAux = {} ;

  pago = {
    nombrePago: "",
    fechaPago: "",
    montoPago: null,
    lugarPago:  "",
    id: "",
  };
  indiceAux: number;
  keyAux: string;
  nombreAux: string;
  
  perfil;

  headElements = ['Nombre', 'Monto', 'Fecha', 'Lugar'];
  showform: boolean;

  bodyText: string = "Body Text!!";
  constructor(private dataServices: DataServices, private modalService: ModalService) { 
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
    // console.log("events", pagos);
    if (pagos != null) {
      let registroPagos = Object.keys(pagos);
      for (var i of registroPagos) {
        var evento = pagos[i];
            evento.key = i;

        fechaEvento = new Date(evento.fecha);
        
        if (evento.detalle) {
          evento.dataSalvaje = [];
          evento.data = [];
          // console.log("no esta vacio");
          let detallePagos = Object.keys(evento.detalle);
          var total = 0;
          for (var i of detallePagos) {
            var detalle = evento.detalle[i];
              detalle.key = i;
              // console.log("detalle", detalle);
              total += detalle.monto;
              evento.dataSalvaje.push(detalle);
              }
              // console.log("total", total);
              evento.data = this.ordenarDetalle(evento.dataSalvaje);
              evento.total = total;
        }
        // if (this.hoy > fechaEvento) {
          
        //   //  this.historialArray.push(evento);
          
        // } else {

        //   this.pagosArray.push(evento);
        // }
        this.pagosArray.push(evento);
        
        
      }
      
      // this.orderArray(this.pagosArray);
      // this.orderArray(this.historialArray);
    }
    // console.log(this.pagosArray);
  }
  addEvent(form: NgForm){
   
    if (form.value.nombre && form.value.fecha && form.value.monto) {
      let newEvent = {
        nombre: form.value.nombre,
        fecha: form.value.fecha,
        monto: form.value.monto,
        comentarios: form.value.comentarios,
        key: null,
        detalle: {}
      }
      if (this.detalleAux) {
        newEvent.detalle = this.detalleAux;
        newEvent.key = this.keyAux;
      }
      console.log("newEvent", newEvent);
      this.dataServices.guardarPago(newEvent);
      this.newEvent();
      // this.getRegistros();
    } else {
      
      this.testValuesEvento()
    }

  }
  edithPlan(plan){
    console.log(plan);
    
    this.fecha = plan.fecha;
    this.comentarios = plan.comentarios;
    this.nombre = plan.nombre;
    this.monto = plan.monto;
    this.detalleAux = plan.detalle;
    this.keyAux = plan.key;
    
  }

  delAuxPlan(index, key, nombre){
    this.indiceAux = index;
    this.keyAux = key;
    this.nombreAux = nombre;
   
  }
  delPlan(){
    this.dataServices.deleteRegistroPago(this.keyAux, this.nombreAux);
    this.pagosArray.splice(this.indiceAux, 1);
  }
  newEvent(){
    
    this.nombre = "";
    this.fecha = "";
    this.monto = null;
    this.comentarios = "";
    this.errorArray.nombre = false;
    this.errorArray.fecha = false;
    this.errorArray.monto = false;

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
    this.errorArray.nombrePago = false;
    this.errorArray.fechaPago = false;
    this.errorArray.montoPago = false;
    this.errorArray.lugarPago = false;
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
      this.dataServices.updatePago(newPay);
      this.pagosArray[indice].data.push(newPay);
      // this.newEvent();
      this.cleanFormPago();
      
      
        } else {
      this.testValuesPago()
    }
  }

  ordenarDetalle(list){
    
    let nuevoObjeto = {};
    let abonosArray = [];
    let arrayResponse = [];
    let total: number = 0;

    list.forEach( x => {
      
      if( !nuevoObjeto.hasOwnProperty(x.nombre)){
        nuevoObjeto[x.nombre] = {
          abonos: [],
          total: 0,
          fecha: "",
          id: null,
          key: null,
          nombre: "",
          lugar: ""
        }
      }
      
        nuevoObjeto[x.nombre].abonos.push({
          monto: x.monto,
          fecha: x.fecha
        })

        if (nuevoObjeto[x.nombre].abonos.length > 1) {
          total = 0;
          abonosArray = nuevoObjeto[x.nombre].abonos
          abonosArray.forEach( element => {
              total += element.monto;
          });
          
        } else {
          total = 0;
           total = nuevoObjeto[x.nombre].abonos[0].monto;
        }
        
        nuevoObjeto[x.nombre].total = total
        nuevoObjeto[x.nombre].fecha = x.fecha
        nuevoObjeto[x.nombre].id = x.id
        nuevoObjeto[x.nombre].key = x.key
        nuevoObjeto[x.nombre].nombre = x.nombre
        nuevoObjeto[x.nombre].lugar = x.lugar
        
      })
      // console.log(nuevoObjeto);

    let arrayAux = Object.keys(nuevoObjeto);
    for (var i of arrayAux) {
      var evento = nuevoObjeto[i];
          evento.key = i;
          arrayResponse.push(evento);
    }
    return arrayResponse;
    // console.log(arrayResponse)
  }

  inputForm(tipo){

    switch (tipo) {
      case "nombre":
        if (this.nombre) { 
          this.errorArray.nombre = false;
        }
        break;
      case "fecha":
        if (this.fecha) {
          this.errorArray.fecha = false;
        }
        break;
      case "monto": 
        if (this.monto) {
            this.errorArray.monto = false;
        }
        break;
      case "nombrePago": 
        if (this.pago.nombrePago) {
            this.errorArray.nombrePago = false;
        }
        break;
      case "fechaPago": 
        if (this.pago.fechaPago) {
            this.errorArray.fechaPago = false;
        }
        break;
      case "montoPago": 
        if (this.pago.montoPago) {
            this.errorArray.montoPago = false;
        }
        break;
      case "lugarPago": 
        if (this.pago.lugarPago) {
            this.errorArray.lugarPago = false;
        }
        break;
    
    }
 
    
  }
  testValuesEvento(){

    if (this.nombre) {
      this.errorArray.nombre = false;
    } else {
      this.errorArray.nombre = true;
    }
    if (this.fecha) {
      this.errorArray.fecha = false;
    } else {
      this.errorArray.fecha = true;
    }
    if (this.monto) {
      this.errorArray.monto= false;
    } else {
      this.errorArray.monto = true;
    }
  }
  testValuesPago(){

    if (this.pago.nombrePago) {
      this.errorArray.nombrePago = false;
    } else {
      this.errorArray.nombrePago = true;
    }
    if (this.pago.fechaPago) {
      this.errorArray.fechaPago = false;
    } else {
      this.errorArray.fechaPago = true;
    }
    if (this.pago.montoPago) {
      this.errorArray.montoPago= false;
    } else {
      this.errorArray.montoPago = true;
    }
    if (this.pago.lugarPago) {
      this.errorArray.lugarPago= false;
    } else {
      this.errorArray.lugarPago = true;
    }
  }
    openModal(id: string) {
      console.log(id);
      
      this.modalService.open(id);
  }
  
  closeModal(id: string) {
      this.modalService.close(id);
  }
}
