import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Admin } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    admins: Admin[] = [];

    constructor(private adminService: AccountService) { }

    ngOnInit() {
        this.loading = true;
        this.adminService.getAll().pipe(first()).subscribe(admins => {
            this.loading = false;
            this.admins = admins;
        });
    }
}
