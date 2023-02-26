import { Component } from '@angular/core';

import { Role, Department, Employee } from '../_models';
import { AccountService, DepartmentService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    employee: Employee;
    department: Department;
    isAdmin: boolean;

    constructor(private accountService: AccountService, private departmentService: DepartmentService) {
        this.employee = this.accountService.employeeValue;
        console.log(this.employee)
        this.isAdmin = this.employee && this.employee.role === Role.Admin;
        if(this.isAdmin) {
          this.departmentService.getDepartmentById(this.employee.department).subscribe(department => {
            this.department = department;
            console.log( this.department.name )
          });
        }
    }


    logout() {
        this.accountService.logout();
    }
}
