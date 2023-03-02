import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AdminService } from '@app/_services/admin.service';
import { Admin } from '@app/_models';
@Component({ templateUrl: 'admin-list.component.html' })
export class AdminListComponent implements OnInit {
    admins = null;
    username : string;


    constructor(
        private adminService: AdminService,
    ) {}


    ngOnInit() {
        this.adminService.getAllAdmins()
            .pipe(first())
            .subscribe(admins => this.admins = admins);
        };

        setID(username: string) {
          this.username = username;
      }

    }


