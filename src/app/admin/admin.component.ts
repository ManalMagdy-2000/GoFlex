import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

<<<<<<< HEAD:src/app/admin/admin.component.ts
import { Employee } from '@app/_models';
import { AccountService } from '@app/_services';
=======
import { Employee } from '../_models';
import { AccountService } from '../_services';
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/admin/admin.component.ts

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    employees: Employee[] = [];

    constructor(private employeeService: AccountService) { }

    ngOnInit() {
        this.loading = true;
        this.employeeService.getAll().pipe(first()).subscribe(employees => {
            this.loading = false;
            this.employees = employees;
        });
    }
}
