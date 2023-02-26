import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

<<<<<<< HEAD:src/app/_helpers/auth.guard.ts
import { AccountService } from '@app/_services';
=======
import { AccountService } from '../_services';
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/_helpers/auth.guard.ts

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const employee = this.accountService.employeeValue;
        if (employee) {

            if (route.data.roles && route.data.roles.indexOf(employee.role) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
