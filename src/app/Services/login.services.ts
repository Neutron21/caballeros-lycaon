import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppConstant } from '../const'

import { DataServices } from './dataServices';

@Injectable()
export class LoginService{
    token: string;
    
    constructor(private router: Router,
                private dataServices: DataServices){}

    login(email: string, pass: string){
        
        firebase.auth().signInWithEmailAndPassword(email, pass).then(
            response => {
                firebase.auth().currentUser.getIdToken().then(
                    token => {
                        this.token = token;
                        this.router.navigate(['/']);
                        
                        console.log("Auth ok!");
                        
                    }
                )
            }
        )
        
    }
    
    getIdToken(){
        return this.token;
    }
    isAutenticated(){
        return this.token != null;
    }
    logout(){
        firebase.auth().signOut().then( 
            () => {
                this.token = null;
                this.router.navigate(['login']);
            }
        ).catch( error => console.error("error de Logout: "+error))
    }
    addNewMember(data){
        let msj: string;
        firebase.auth().createUserWithEmailAndPassword(data.email, AppConstant.PASSWORD).then(
            userMember => {
                let { user } = userMember;
                let userTosave = {
                    email: data.email,
                    nombre: data.nombre,
                    aPat: data.aPat,
                    aMat: data.aMat,
                    nickName: data.nickName,
                    uid: user.uid,
                    cel: data.celular,
                    
                }
                
                this.dataServices.guardarMiembro(userTosave);
                
                console.log("se creo con exito"); 
                
            }
        ).catch( err => {
            console.log("err: " +err); 
            alert(err.message); 
            msj = err.message;
        })
        return msj;
    }
   
   
}