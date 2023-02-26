﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services';
import { Employee } from '../_models/employee';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    employees = null;
    employee: Employee[] = [];
    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(employees => this.employees = employees);
    }

    deleteEmployee(id: string) {
        const employee = this.employees.find(x => x.id === id);
        employee.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.employees = this.employees.filter(x => x.id !== id));
    }
}
