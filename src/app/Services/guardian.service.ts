import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.services';
import * as firebase from 'firebase';

export class Guardian implements CanActivate{

    constructor(private loginService: LoginService,
                private router: Router){}

    
   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       await this.sesionActiva()
        if(this.loginService.isAutenticated()){
            return true;
        }else{
            this.router.navigate(['login']);
            return false;
        }
    }
    async sesionActiva(){
    
        let user = await new Promise((resolve,reject)=>{
         firebase.auth().onAuthStateChanged(function(user) {
           
           if (user) {
             resolve(user);
             // User is signed in.
           } else {
             // resolNo user is signed in.
             resolve(false);
           }
         }
         
         );
        }) ;
       
        let isAut = user ? user.refreshToken : false;
        console.log(isAut);
        
        this.loginService.setToken(user.refreshToken);
      }

}