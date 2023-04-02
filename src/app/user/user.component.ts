import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'user.component.html' })
export class UserComponent implements OnInit {
    loading = false;
    users: User[] = [];

    constructor(private userService: AccountService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll()
        .pipe( map ((userList) => {
          return userList.allusers.map( user => {
            return {
              username: user.username,
              password : user.password ,
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
