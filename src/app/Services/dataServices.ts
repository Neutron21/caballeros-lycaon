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
    // eventos: Evento[] = [];

    guardarMiembro(member) {

        firebase.database().ref(`/users/${member.uid}`).set(member).then(() => {

            console.log("EXITO");
            alert("Guardado exitoso!");

        }).catch((error) => {
            firebase.auth().currentUser.delete().then(() => {

            }).catch((errorDel) => {

            })
        })
    }
    getMembers() {

        return new Promise((resolve, reject) => {
            firebase.database().ref(`/users`).on("value", (data) => {
                // console.log(data.val());
                resolve(data.val());

            })
        })
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
            console.log("Se Elimino: " + name);
        }).catch((error) => {
            alert("Hubo un error!");
        })
    }
    getPerfil() {
        try {
            let uid = firebase.auth().currentUser.uid;
            return this.findMember(uid);
        } catch (error) {
            // console.log(error);
        }

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
        return new Promise((resolve, reject) => {
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

                firebase.database().ref('/eventos/').push(evento).then((snap) => {

                    console.log("EXITO");
                    alert("Guardado exitoso!");
                    // this.eventos.push(evento);
                    console.log(snap.key);
                    resolve(snap.key)


                }).catch((error) => {
                    console.log("ERROR");
                    reject(error)
                })
            }
        }
        )
    }
    getEvents() {
        
        return new Promise((resolve, reject) => {
            firebase.database().ref(`/eventos`).on("value", (data) => {
                
                // console.log(data.val());
                
                resolve(data.val());

            })
        })
    }

    deleteEvent(key: string, lugar: string) {

        firebase.database().ref(`/eventos/${key}`).remove().then(() => {
            alert("Se Elimino: " + lugar);


        }).catch((error) => {
            alert("Hubo un error!");
        })
    }
    guardarMensaje(mensaje) {
     
        firebase.database().ref(`/mensajes/`).push(mensaje).then((snap) => {

            console.log("EXITO");
            // alert("Guardado exitoso!");

        }).catch((error) => {
            alert("Error al enviar!");
        })
    }
    getMensajes() {

        return new Promise((resolve, reject) => {
            firebase.database().ref(`/mensajes`).on("value", (data) => {
                // console.log(data.val());
                resolve(data.val());

            })
        })
    }
}
