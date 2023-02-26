﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

<<<<<<< HEAD:src/app/departments/list.component.ts
import { AccountService, AlertService, DepartmentService } from '@app/_services';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Role, Department } from '@app/_models';
=======
import { AccountService, AlertService, DepartmentService } from '../_services';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Role, Department } from '../_models';
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/departments/list.component.ts
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@coreui/angular';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    departments = null;
    form: UntypedFormGroup;
    form2: UntypedFormGroup;
    departmentID: string;
    requestID: string;
    isAddMode: boolean;
    department: Department;
    requests: Request[];
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private departmentService: DepartmentService,
        private accountService: AccountService,
        private alertService: AlertService,
        private modal: ModalService
    ) {}


    ngOnInit() {
        this.departmentService.getAllDepartments()
            .pipe(first())
            .subscribe(departments => this.departments = departments);


        // this.departmentID = this.route.snapshot.params['departmentID'];
        // this.requestID = this.route.snapshot.params['requestID'];
        this.isAddMode = !this.departmentID;

        // password not required in edit mode
        const passwordValidators = [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')];
        const emailVal = [ Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')];

        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }
        if (this.isAddMode) {
            emailVal.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            requests: [[]],
            Admins: [[]]
        });

        console.log(this.departmentID)
        this.form2 = this.formBuilder.group({
            fullname: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            employeeid: ['', Validators.required],
            password: ['', passwordValidators],
            position: ['', Validators.required],
            role: [Role.Admin],
            department: [this.departmentID]
        });


        if (!this.isAddMode) {
            this.departmentService.getDepartmentById(this.departmentID)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    get f2() { return this.form2.controls; }

    set setStatus(status : string){

    }
    onSubmit() {
        this.submitted = true;
        console.log(this.form)
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }



        this.loading = true;

            this.createDepartment();
        // } else {
        //     this.updateEmployee();
        // }

    }



    onSubmit2() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form2.invalid) {
            return;
        }



        this.loading = true;
        //toggle modal

        this.form2.patchValue({department: this.departmentID});
        this.createEmployee();
        // } else {
        //     this.updateEmployee();
        // }

    }


    setID(departmentID: string) {
        this.departmentID = departmentID;
    }

    private createDepartment() {
        this.departmentService.addDepartment(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Department added successfully', { keepAfterRouteChange: true });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private addEmployee() {
        this.departmentService.addEmployee(this.departmentID, this.form2.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
                    // this.router.navigate(['/departments'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private createEmployee() {
        this.accountService.register(this.form2.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Employee added successfully', { keepAfterRouteChange: true });
                    this.addEmployee();
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}