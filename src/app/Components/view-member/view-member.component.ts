import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Miembro } from 'src/app/Models/miembro.model';
import { DataServices } from 'src/app/Services/dataServices';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.css']
})
export class ViewMemberComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
              private dataSevice: DataServices,) { }
  
  id: string;
  perfil;
  edad: string;
  

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      console.log(this.id);
      this.perfil = await this.dataSevice.findMember(this.id)
      console.log(this.perfil);
     
      this.edad = this.getEdad(this.perfil.birthday);
      console.log(this.edad);
    }
  }
  getEdad(birthday){

    let hoy = new Date();
    let yyyy = hoy.getFullYear();
    let mm = hoy.getMonth();
    let dd = hoy.getDate();
    let today = moment(`${yyyy}-${mm}-${dd}`);
    return today.diff(birthday, 'years') + ' años';
  
  }

}
