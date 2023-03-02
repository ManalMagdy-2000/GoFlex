import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { Admin } from '../_models/admin';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    admins = null;
    admin: Admin[] = [];
    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(admins => this.admins = admins);
    }

    deleteAdmin(id: string) {
        const admin = this.admins.find(x => x.id === id);
        admin.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.admins = this.admins.filter(x => x.id !== id));
    }
}
