import { Component } from '@angular/core';

import { Role, Department, Admin } from '@app/_models';
import { AccountService, DepartmentService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    admin: Admin;
    department: Department;
    isAdmin: boolean;

    constructor(private accountService: AccountService, private departmentService: DepartmentService) {
        this.admin = this.accountService.adminValue;
        console.log(this.admin)
        this.isAdmin = this.admin && this.admin.role === Role.Admin;
        if(this.isAdmin) {
          this.departmentService.getDepartmentById(this.admin.department).subscribe(department => {
            this.department = department;
            console.log( this.department.name )
          });
        }
    }


    logout() {
        this.accountService.logout();
    }
}
