import { Component } from '@angular/core';

import { AccountService, DepartmentService } from './_services';
import { Role, Department, Employee } from './_models';
import { INavData } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilPaperPlane, cilHome, cilBank, cilUser, brandSet } from '@coreui/icons';


@Component({ selector: 'app', templateUrl: 'app.component.html', providers: [IconSetService] })
export class AppComponent {
    employee: Employee;
    department: Department;
    departmentsCount: number = 0;
    navItems: INavData[] = [];

    constructor(private accountService: AccountService, public iconSet: IconSetService, private departmentService: DepartmentService) {
        this.accountService.employee.subscribe(x => this.employee = x)
        if(this.employee && this.employee.role === Role.Admin) {
          this.departmentService.getDepartmentById(this.employee.department).subscribe(department => {
            this.department = department;
            console.log( this.department.name )
          });
        }
        this.departmentService.getAllDepartments().subscribe(departments => {
          this.departmentsCount = departments.length;
          console.log( this.departmentsCount )
        })
        iconSet.icons = { cilListNumbered, cilPaperPlane, cilHome, cilBank, cilUser, ...brandSet };
    }

    get isAdmin() {
        return this.employee && this.employee.role === Role.Admin;
    }

    get Admin() {
        return this.employee && this.employee.role === Role.Admin;
    }

    ngOnInit() {

      this.navItems.push(
      //   {
      //   name: 'Employee',
      //   title: true
      // },
      // {
      //   name: this.employee.fullname,
      //   url: '#',
      //   attributes: { disabled: true },
      //   iconComponent: { name: 'cil-employee' },
      // },
      // {
      //   name: this.employee.position,
      //   url: '#',
      //   attributes: { disabled: true },
      //   iconComponent: { name: 'cil-bank' },
      // },
      {
        name: 'Menu',
        title: true
      },
      // {
      //   name: 'Home',
      //   url: '/',
      //   iconComponent: { name: 'cil-home' },
      // },
      {
        name: 'Requests',
        url: '/offers',
        iconComponent: { name: 'cil-list-numbered' },
      },

      // {
      //   name: 'Profile',
      //   url: `/employees/edit/${this.employee?.id}`,
      //   iconComponent: { name: 'cil-employee' },
      // },
      )

      if (this.Admin) { //HR Admin
        this.navItems.push(
          {
            name: 'Departments',
            url: '/departments',
            iconComponent: { name: 'cil-bank' },
            // badge: {
            //   color: 'success',
            //   text: ""+this.departmentsCount,
            //   size: 'lg',
            // }
          },
        )
      }

      if (this.Admin) { //HR Admin
        this.navItems.push(
          {
            name: 'Employees',
            url: '/employees',
            iconComponent: { name: 'cil-user' },
            // badge: {
            //   color: 'success',
            //   text: ""+this.departmentsCount,
            //   size: 'lg',
            // }
          },
        )
      }

      if (this.isAdmin) {    //supervisor or employee
        this.navItems.push(
          {
            name: 'Offers',
            url: '/requests',
            iconComponent: { name: 'cil-paper-plane' },
            // badge: {
            //   color: 'success',
            //   text: 'NEW',
            //   size: 'lg',
            // }
          },
        )
      }

    }

    ngOnDestroy() {
      this.navItems = [];
    }



    logout() {
        this.navItems = [];
        this.accountService.logout();
    }
}
