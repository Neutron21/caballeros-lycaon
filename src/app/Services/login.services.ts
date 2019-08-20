
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { error } from '@angular/compiler/src/util';

@Injectable()
export class LoginService{
    token: string;
    
    constructor(private router: Router){}

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
    addNewMember(email: string){
        firebase.auth().createUserWithEmailAndPassword(email, "123456")
    }
}