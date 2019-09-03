import { Component, OnInit } from '@angular/core';
import { DataServices } from 'src/app/Services/dataServices';
import { NgForm, FormControl } from '@angular/forms';
import { Vehicle } from 'src/app/Models/vehicle.model';
import { TelEmergencia } from 'src/app/Models/telEmergencia.model';
import { AppConstant } from '../../const';
import { Health } from 'src/app/Models/health.model';
import * as moment from 'moment';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  hoy = new Date();
  yyyy = this.hoy.getFullYear();
  mm = this.hoy.getMonth();
  dd = this.hoy.getDate();
  minYear = this.yyyy-50;

  maxDate = moment(new Date()).format('YYYY-MM-DD');
  minDate= moment(new Date(this.minYear, this.mm, this.dd)).format('YYYY-MM-DD');
  date;
  modelos = [];


  editar: boolean = false;
  uid: string;

  bloodType = "SELECCIONE";
  bloodys = AppConstant.TYPE_BLOOD;
  newAllergy: string;
  saludEdit: string[] = [];

  marca: string;
  subMarca: string;
  modelo = "SELECCIONE";
  cc: number;
  placa: string;
  serie: string;
  aseguradora: string;
  poliza: string;
  telAseguradora: number;
  motosEdit: Vehicle[] = [];

  nameContact: string;
  parentesco: string;
  telContact: string;
  contactos: TelEmergencia[] = [];

  perfil;

  arrowDown: boolean = true;
  arrowDown2: boolean = true;
  arrowDown3: boolean = true;
  
  constructor(private dataServices: DataServices) { }

  async ngOnInit() {
    
    this.perfil = await this.dataServices.getPerfil();
    
    for (let index = 0; index < 50; index++) {
      this.modelos[index] = this.yyyy;
      this.yyyy--;
    }
    
    if(this.perfil && this.perfil.uid){
      this.uid = this.perfil.uid; 
      this.motosEdit = this.perfil.motos ? this.perfil.motos : [];
      this.saludEdit = this.perfil.salud.alergias ? this.perfil.salud.alergias : [];
      this.contactos = this.perfil.contactos ? this.perfil.contactos : [];
      this.date = this.perfil.birthday;
      this.bloodType = this.perfil.salud.tipoSangre ? this.perfil.salud.tipoSangre : this.bloodType;
    }
    console.log(this.perfil);

  }
  addVehicle() {
    
    let moto: Vehicle = new Vehicle(this.marca, this.subMarca, this.modelo, this.placa,
                        this.cc, this.serie, this.aseguradora, this.poliza, this.telAseguradora);
    console.log(moto);
    this.motosEdit.push(moto);
    this.marca = "";
    this.subMarca = "";
    this.modelo = "SELECCIONE";
    this.serie = "";
    this.cc = null;
    this.placa = "";
    this.aseguradora = "";
    this.poliza = "";
    this.telAseguradora = null;
  }
  delVehicle(indice: number){
    this.motosEdit.splice(indice, 1);
  }
  addAlergia() {
    
    if (this.newAllergy) {
      this.saludEdit.push(this.newAllergy);
      this.newAllergy = ""
      console.log(this.saludEdit);
    }

  }
  delAlergia(indice: number) {
    this.saludEdit.splice(indice, 1);
  }
  addContacto() {
    if (this.nameContact && this.telContact) {

      let telContacto = new TelEmergencia(this.nameContact, this.parentesco, this.telContact)
      this.contactos.push(telContacto);
      this.nameContact = "";
      this.parentesco = "";
      this.telContact = "";
    }

  }
  delContact(indice: number) {
    this.contactos.splice(indice, 1);
  }
  saveProfile(form: NgForm){
    if (form.value.nombre && form.value.aPat && form.value.aMat 
        && form.value.celPhone && form.value.email && form.value.nickName ) {
          console.log(form);
          console.log(this.motosEdit);
          console.log(this.saludEdit);
          console.log(this.contactos);
          let infoSalud: Health = new Health(this.bloodType,this.saludEdit)

          let newPerfil = {
           nombre: form.value.nombre, 
           aPat: form.value.aPat, 
           aMat: form.value.aMat, 
           birthday: form.value.birthday,
           celular: form.value.celPhone, 
           email: form.value.email, 
           nickName: form.value.nickName,
           uid: this.uid,
           motos: this.motosEdit,
           salud: infoSalud,
           contactos: this.contactos
          }
          console.log(newPerfil);
          this.dataServices.updateMiembro(newPerfil);
          this.changeEdit();
    }
    
    
  }
  changeArrow(){
    this.arrowDown = !this.arrowDown;
    this.arrowDown2 = true;
    this.arrowDown3 = true;
  }
  changeArrow2(){
    this.arrowDown2 = !this.arrowDown2;
    this.arrowDown = true;
    this.arrowDown3 = true;
  }
  changeArrow3(){
    this.arrowDown3 = !this.arrowDown3;
    this.arrowDown = true;
    this.arrowDown2 = true;
  }
  changeEdit(){
    this.editar = !this.editar;
  }
}
