import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Miembro } from '../Models/miembro.model';
import { AppConstant } from '../const'

@Injectable()
export class DataServices{
    constructor(private httpClient: HttpClient){}
    
    guardarMiembro(member: Miembro){
        this.httpClient.post(`${AppConstant.URL_DB}users.json`
        ,member).subscribe(
            response => {
                alert("Se creo: "+member.nombre);
                console.log("Guardando persona " + response);
            }, error => {
                console.log("Ocurrio un error! " + error);
                console.log(error);
            }
        );
    }
    getMembers(){
       return this.httpClient.get(`${AppConstant.URL_DB}users.json`);
    }
    
}
