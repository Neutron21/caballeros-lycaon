import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../const';
import { Miembro } from '../Models/miembro.model';
import { Router } from '@angular/router';
import { log } from 'util';



@Injectable()
export class DataServices {
     modal = {
        titulo: "",
        message: "",
        color: null
     };
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
       
        return new Promise((resolve, reject) => {
            
                if (firebase.auth().currentUser) {
                    let uid = firebase.auth().currentUser.uid;
                    resolve(this.findMember(uid));
                } 
        })
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
                    resolve(evento.key)
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
    guardarPago(pago) {
        
        return new Promise((resolve, reject) => {
            
            if (pago.key) {
                
                firebase.database().ref(`/pagos/${pago.key}`).update(pago).then(() => {
                    
                    this.modal.titulo = "EXITO";
                    this.modal.message = "Evento actualizado!";
                    this.modal.color = true;
                    resolve(this.modal);
                }).catch((error) => {
                    
                    console.log(error);
                    this.modal.titulo = "ERROR";
                    this.modal.message = "Ocurrio un error!";
                    this.modal.color = false;
                    reject(this.modal);
                })
            } else{
                firebase.database().ref(`/pagos/`).push(pago).then((snap) => {
                    this.modal.titulo = "EXITO";
                    this.modal.message = "Guardado exitoso!";
                    this.modal.color = true;
                    resolve(this.modal);
        
                }).catch((error) => {
                    this.modal.titulo = "ERROR";
                    this.modal.message = "Ocurrio un error!";
                    reject(this.modal);
                })
            }
        });
            
       
    }
    getPagos() {

        return new Promise((resolve, reject) => {
            
            firebase.database().ref(`/pagos`).on("value", (data) => {
                // console.log(data.val());
                resolve(data.val());

            })
        });
    }
    updatePago(pago) {
        return new Promise((resolve, reject) => {
            firebase.database().ref(`/pagos/${pago.id}/detalle`).push(pago).then(() => {
            this.modal.titulo = "EXITO";
            this.modal.message = "Pago agregado con exito!";
            this.modal.color = true;
            resolve(this.modal);
    
            }).catch((error) => {
                this.modal.titulo = "ERROR";
                this.modal.message = "Ocurrio un error!";
                this.modal.color = true;
                console.log(error);
                reject(this.modal);
                
            })
        });
        
    }
    deleteRegistroPago(key: string, nombre: string) {
     
    return new Promise((resolve, reject) => {
        firebase.database().ref(`/pagos/${key}`).remove().then(() => {
            
            this.modal.titulo = "EXITO";
            this.modal.message = "Se Elimino: " + nombre;
            this.modal.color = true;
            resolve(this.modal);

        }).catch((error) => {
            this.modal.titulo = "ERROR";
            this.modal.message = "Ocurrio un error!";
            this.modal.color = false;
            console.log(error);
            reject(this.modal);
            
        })
    });
    }
    
}
