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
                    async token => {
                        this.token = token;
                       let perfil = await this.dataServices.getPerfil();
                       if (perfil) {
                        
                        this.router.navigate(['/']);
                        console.log("Auth ok!");
                       } else{
                        console.log(perfil, 'no hay perfil');
                        this.logout();
                       }
                        
                    }
                )
            }
        )
        
    }
    setToken(token){
        this.token = token;
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
                // console.log(userMember); 
                let { user } = userMember;
                let userTosave = {
                    email: data.email,
                    nombre: data.nombre,
                    aPat: data.aPat,
                    aMat: data.aMat,
                    nickName: data.nickName,
                    uid: user.uid,
                    celular: data.celular,
                    admin: data.admin,
                    activo: data.activo
                    
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