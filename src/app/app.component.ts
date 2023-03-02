import { Component } from '@angular/core';

import { AccountService, DepartmentService } from './_services';
import { Role, Department, Admin } from './_models';
import { INavData } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilPaperPlane, cilHome, cilBank, cilUser, brandSet } from '@coreui/icons';


@Component({ selector: 'app', templateUrl: 'app.component.html', providers: [IconSetService] })
export class AppComponent {
    admin: Admin;
    department: Department;
    departmentsCount: number = 0;
    navItems: INavData[] = [];

    constructor(private accountService: AccountService, public iconSet: IconSetService, private departmentService: DepartmentService) {
        this.accountService.admin.subscribe(x => this.admin = x)
        if(this.admin && this.admin.role === Role.Admin) {
          this.departmentService.getDepartmentById(this.admin.department).subscribe(department => {
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

    get isSuperAdmin() {
        return this.admin && this.admin.role === Role.SuperAdmin;
    }

    get isAdmin() {
        return this.admin && this.admin.role === Role.Admin;
    }

    ngOnInit() {

      this.navItems.push(
      //   {
      //   name: 'Admin',
      //   title: true
      // },
      // {
      //   name: this.admin.fullname,
      //   url: '#',
      //   attributes: { disabled: true },
      //   iconComponent: { name: 'cil-admin' },
      // },
      // {
      //   name: this.admin.position,
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
     /* {
        name: 'Requests',
        url: '/offers',
        iconComponent: { name: 'cil-list-numbered' },
      },*/

      // {
      //   name: 'Profile',
      //   url: `/admins/edit/${this.admin?.id}`,
      //   iconComponent: { name: 'cil-admin' },
      // },
      )

      if (this.isSuperAdmin) { //HR Admin
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

      if (this.isSuperAdmin) { //HR Admin
        this.navItems.push(
          {
            name: 'Admins',
            url: '/admins',
            iconComponent: { name: 'cil-user' },
            // badge: {
            //   color: 'success',
            //   text: ""+this.departmentsCount,
            //   size: 'lg',
            // }
          },
        )
      }

   /*   if (this.isAdmin) {    //supervisor or admin
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
      }*/

    }

    ngOnDestroy() {
      this.navItems = [];
    }



    logout() {
        this.navItems = [];
        this.accountService.logout();
    }
}
