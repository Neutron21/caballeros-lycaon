import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Miembro } from '../Models/miembro.model';

@Injectable()
export class DataServices{
    constructor(private httpClient: HttpClient){}
    
    guardarMiembro(member: Miembro){
        this.httpClient.post('https://caballeros-mc.firebaseio.com/users.json'
        +member.uid,member).subscribe(
            response => {
                console.log("Guardando persona " + response);
            }, error => {
                console.log("Ocurrio un error! " + error);
                console.log(error);
            }
        )
    }
}
