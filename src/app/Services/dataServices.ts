import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Login } from '../Models/login.model';

@Injectable()
export class DataServices{
    constructor(private httpClient: HttpClient){}
    
    guardarLogin(login: Login[]){
        this.httpClient.post('https://caballeros-mc.firebaseio.com/datos.json',login).subscribe(
            response => {
                console.log("Guardando personas " + response);
            }, error => {
                console.log("Ocurrio un error! " + error);
            }
        )
    }
}
