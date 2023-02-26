import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

<<<<<<< HEAD:src/app/users/list.component.ts
import { AccountService } from '@app/_services';
=======
import { AccountService } from '../_services';
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/users/list.component.ts
import { Employee } from '../_models/employee';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    employees = null;
    employee: Employee[] = [];
    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(employees => this.employees = employees);
    }

    deleteEmployee(id: string) {
        const employee = this.employees.find(x => x.id === id);
        employee.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.employees = this.employees.filter(x => x.id !== id));
    }
}
