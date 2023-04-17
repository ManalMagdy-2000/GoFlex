/*
   Student Name : Manal Magdy Eid Khalil Eid
   Student ID : B1901825

*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DepartmentService, AlertService, AccountService } from '@app/_services';

@Component({ templateUrl: 'add-request.component.html' })
export class AddRequestComponent implements OnInit {
    form: UntypedFormGroup;
    departmentID: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    username : string ;
    id : string;


    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private departmentService: DepartmentService,
        private alertService: AlertService ,
        private accountService : AccountService
    ) {}

    ngOnInit() {
        this.departmentID = this.route.snapshot.params['id'];
        this.isAddMode = !this.departmentID;
        console.log(this.isAddMode);

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            description: ['', Validators.required],
            date: ['', Validators.required],
            time: ['', Validators.required],
            reviews: [[]]
        });

        if (!this.isAddMode) {
            this.departmentService.getDepartmentById(this.departmentID)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
      console.log("**********submit req***************")
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

            this.addRequest();
        // } else {
        //     this.updateUser();
        // }

    }

    private addRequest() {
      console.log("**********call addreq serv***************")
        this.accountService.addRequest(this.form.value , this.id)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}
