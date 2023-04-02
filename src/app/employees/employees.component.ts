import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';
import { Role } from '../_models/role';
import { User } from '@app/_models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    users = null;

    constructor(private accountService: AccountService) {}

    ngOnInit() {

      this.accountService.getAll()
      .pipe( map ((userList) => {
        return userList.allusers.map( user => {
          return {
            username: user.username,
            password : user.password ,
            fullname : user.fullname ,
            email : user.email ,
            position : user.position ,
            department : user.department ,
            role : user.role,
            employeeID : user.employeeID ,
            supervisorID : user.supervisorID
          }
        }
        );
      }))
      .subscribe(users => {this.users = users});
    }


}
/*
   Student Name : Manal Magdy Eid Khalil Eid
   Student ID : B1901825

*/
