import { Component, OnInit } from '@angular/core';
import { DataServices } from 'src/app/Services/dataServices';
import { NgForm } from '@angular/forms';
import { Vehicle } from 'src/app/Models/vehicle.model';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  editar: boolean = true;
  uid: string;
  bloodType: string;
  newAllergy: string;
  saludEdit: string[] = [];
  motosEdit: Vehicle[] = [];
  // infoEdit: InfoEmergencia[];
  perfil = {};
  constructor(private dataServices: DataServices) { }

  async ngOnInit() {

    this.perfil = await this.dataServices.getPerfil();
    console.log(this.perfil);

  }
  addAlergia(form: NgForm) {

    if (form.value.newAllergy) {
      this.saludEdit.push(form.value.newAllergy);
      this.newAllergy = ""
      console.log(this.saludEdit);
    }

  }
  delElement(indice: number) {
    this.saludEdit.splice(indice,1);
  }
}
