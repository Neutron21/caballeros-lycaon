import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.services';

export class Guardian implements CanActivate{

    constructor(private loginService: LoginService,
                private router: Router){}

    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.loginService.isAutenticated()){
            return true;
        }else{
            this.router.navigate(['login']);
            return false;
        }
    }

}