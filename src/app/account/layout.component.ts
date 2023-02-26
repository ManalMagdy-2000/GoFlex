import { Component } from '@angular/core';
import { Router } from '@angular/router';

<<<<<<< HEAD:src/app/account/layout.component.ts
import { AccountService } from '@app/_services';
=======
import { AccountService } from '../_services';
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/account/layout.component.ts

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        // redirect to home if already logged in
        if (this.accountService.employeeValue) {
            this.router.navigate(['/']);
        }
    }
}
