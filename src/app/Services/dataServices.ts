import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../const';
import { Miembro } from '../Models/miembro.model';
import { Router } from '@angular/router';

@Injectable()
export class DataServices {

    constructor(private httpClient: HttpClient,
        private router: Router) { }

    miembros: Miembro[];

    guardarMiembro(member) {

        firebase.database().ref(`/users/${member.uid}`).set(member).then(() => {
            // this.miembros.push(member);
            // this.router.navigate(['miembros']);

            console.log("EXITO");
            alert("Guardado exitoso!");

        }).catch((error) => {
            firebase.auth().currentUser.delete().then(() => {
                //Si lo elmino de la base de firebase
            }).catch((errorDel) => {
                //Si no puedo eliminarlo
                // reject({error:true,msg:"Ocurrio un error inesperado."});
            })
        })
    }
    getMembers() {
        return this.httpClient.get(`${AppConstant.URL_DB}users.json`);
    }

    findMember(uid: string) {

        return new Promise((resolve, reject) => {
            firebase.database().ref(`/users/${uid}`).on("value", (data) => {

                resolve(data.val());

            })
        })



    }

    deleteMember(uid: string, name: string) {

        firebase.database().ref(`/users/${uid}`).remove().then(() => {
            alert("Se Elimino: " + name);
        }).catch((error) => {
            alert("Hubo un error!");
        })
    }
    getPerfil() {
        let uid = firebase.auth().currentUser.uid;
        return this.findMember(uid);

    }
    updateMiembro(member) {

        firebase.database().ref(`/users/${member.uid}`).update(member).then(() => {
            // this.miembros.push(member);
            // this.router.navigate(['miembros']);

            console.log("EXITO");
            alert("Perfil actualizado con exito!");

        }).catch((error) => {
            console.log("ERROR");
            console.log(error);
            alert("Ocurrio un error!");
        })
    }
    guardarEvento(evento) {
        if (evento.key) {
            firebase.database().ref(`/eventos/${evento.key}`).update(evento).then(() => {
                console.log("EXITO");
                alert("Evento actualizado!");
    
            }).catch((error) => {
                console.log("ERROR");
                console.log(error);
                alert("Ocurrio un error!");
            })
        } else {

            firebase.database().ref('/eventos/').push(evento).then(() => {
                // this.miembros.push(member);
                // this.router.navigate(['miembros']);

                console.log("EXITO");
                alert("Guardado exitoso!");

            }).catch((error) => {
                console.log("ERROR");

            })
        }
    }
    getEvents() {
        return this.httpClient.get(`${AppConstant.URL_DB}eventos.json`);
    }
    deleteEvent(key: string, lugar: string) {

        firebase.database().ref(`/eventos/${key}`).remove().then(() => {
            alert("Se Elimino: " + lugar);
        }).catch((error) => {
            alert("Hubo un error!");
        })
    }
}
