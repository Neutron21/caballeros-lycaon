import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../const';
import { Miembro } from '../Models/miembro.model';
import { Router } from '@angular/router';

@Injectable()
export class DataServices{
    
    constructor(private httpClient: HttpClient,
                private router: Router){}
    
    miembros: Miembro[];

    guardarMiembro(member){
       
        firebase.database().ref(`/users/${member.uid}`).set(member).then(() => {
            this.miembros.push(member);
            this.router.navigate(['miembros']);
            
            console.log("EXITO");
            alert("Guardado exitoso!");

        }).catch((error) => {
            firebase.auth().currentUser.delete().then(()=>{
                //Si lo elmino de la base de firebase
            }).catch((errorDel)=>{
                //Si no puedo eliminarlo
               // reject({error:true,msg:"Ocurrio un error inesperado."});
            })
        })
    }
    getMembers(){
       return this.httpClient.get(`${AppConstant.URL_DB}users.json`);
    }
    findMember(id: string){
        let miembro: Miembro = this.miembros[id];
        return miembro;
    }
}
