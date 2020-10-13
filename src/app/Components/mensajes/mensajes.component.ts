import { Component, OnInit } from '@angular/core';
import { DataServices } from 'src/app/Services/dataServices';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  perfil;
  loading: boolean;
  mensajesArray = [];

  constructor(private dataServices: DataServices) {
    this.loading = true;
  }

  async ngOnInit() {
    // this.perfil = await this.dataServices.getPerfil();
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
    this.loading = false;
  }

}
