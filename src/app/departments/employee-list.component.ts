import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
<<<<<<< HEAD:src/app/departments/employee-list.component.ts
import { EmployeeService } from '@app/_services/employee.service';
import { Employee } from '@app/_models';
=======
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models';
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/departments/employee-list.component.ts
@Component({ templateUrl: 'employee-list.component.html' })
export class EmployeeListComponent implements OnInit {
    employees = null;
    employeeID : string;


    constructor(
        private employeeService: EmployeeService,
    ) {}


    ngOnInit() {
        this.employeeService.getAllEmployees()
            .pipe(first())
            .subscribe(employees => this.employees = employees);
        };

        setID(employeeID: string) {
          this.employeeID = employeeID;
      }

    }


