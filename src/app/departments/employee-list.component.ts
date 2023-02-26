import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { EmployeeService } from '@app/_services/employee.service';
import { Employee } from '@app/_models';
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


