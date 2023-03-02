import { Component } from '@angular/core';

import { AccountService, DepartmentService } from './_services';
import { Role, Department, User } from './_models';
import { INavData } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilPaperPlane, cilHome, cilBank, cilUser, brandSet } from '@coreui/icons';


@Component({ selector: 'app', templateUrl: 'app.component.html', providers: [IconSetService] })
export class AppComponent {
    user: User;
    department: Department;
    departmentsCount: number = 0;
    navItems: INavData[] = [

    ];

    constructor(private accountService: AccountService, public iconSet: IconSetService, private departmentService: DepartmentService) {
        this.accountService.user.subscribe(x => this.user = x)
        if(this.user && this.user.role === Role.Admin) {
          this.departmentService.getDepartmentById(this.user.department).subscribe(department => {
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
        return this.user && this.user.role === Role.Admin;
    }

    get isSuperAdmin() {
        return this.user && this.user.role === Role.SuperAdmin;
    }

    ngOnInit() {

      this.navItems.push(
      //   {
      //   name: 'User',
      //   title: true
      // },
      // {
      //   name: this.user.fullname,
      //   url: '#',
      //   attributes: { disabled: true },
      //   iconComponent: { name: 'cil-user' },
      // },
      // {
      //   name: this.user.position,
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
      },
    */
      // {
      //   name: 'Profile',
      //   url: `/users/edit/${this.user?.id}`,
      //   iconComponent: { name: 'cil-user' },
      // },
      )

      if (this.isSuperAdmin) {
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
      if (this.isSuperAdmin) {
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

      if (this.isAdmin) {
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
