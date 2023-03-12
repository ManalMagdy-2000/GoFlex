import { Component } from '@angular/core';

import { Role, Department, User } from '@app/_models';
import { AccountService, DepartmentService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    department: Department;
    isEmployee: boolean;

    constructor(private accountService: AccountService, private departmentService: DepartmentService) {
        this.user = this.accountService.userValue;
        console.log(this.user)
        this.isEmployee = this.user && this.user.role === Role.Employee;
        if(this.isEmployee) {
          this.departmentService.getDepartmentById(this.user.department).subscribe(department => {
            this.department = department;
            console.log( this.department.name )
          });
        }
    }


    logout() {
        this.accountService.logout();
    }
}
/*
   Student Name : Manal Magdy Eid Khalil Eid
   Student ID : B1901825

*/
