import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
      this.accountService.getAll()
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
      .subscribe(users => {this.users = users
      });
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }
}
/*
   Student Name : Manal Magdy Eid Khalil Eid
   Student ID : B1901825

*/
