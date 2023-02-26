import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Employee } from '../_models';
import { AccountService } from '../_services';

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
