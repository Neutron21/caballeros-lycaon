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
      
      this.perfil = await this.dataSevice.findMember(this.id)
      this.edad = this.getEdad(this.perfil.birthday);
      
    }
  }
  getEdad(birthday){
    // debugger
    let hoy = new Date();
    let yyyy = hoy.getFullYear();
    let mm = hoy.getMonth() + 1;
    let dd = hoy.getDate();
    let today = moment(`${yyyy}-${mm}-${dd}`);
    console.log(today.diff(birthday, 'years') + ' años');
    
    return today.diff(birthday, 'years') + ' años';
  
  }

}
