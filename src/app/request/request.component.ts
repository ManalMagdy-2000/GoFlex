import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, DepartmentService } from '@app/_services';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Department, Request } from '@app/_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'request.component.html' })
export class RequestComponent implements OnInit {
    departments = null;
    form: FormGroup;
    departmentID: string;
    requestID: string;
    offerID: string;
    isAddMode: boolean;
    department: Department;
    requests: Request[];
    loading = false;
    isResource = false;
    submitted = false;
    success = false;
    isTutor = true;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private departmentService: DepartmentService,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}


    ngOnInit() {
        console.log(this.accountService.userValue);
        this.departmentService.getDepartmentById(this.accountService.userValue.department).subscribe(department => {
            this.department = department;
            this.requests = department.requests;
        });


        this.departmentID = this.accountService.userValue.department;
        // this.requestID = this.route.snapshot.params['requestID'];
        this.isAddMode = !this.departmentID;

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            description: ['', Validators.required],
            date: ['', this.isTutor ? Validators.required : ''],
            time: ['', this.isTutor ? Validators.required : ''],
            studentLevel: ['', this.isTutor ? Validators.required : ''],
            numberOfStudents: ['', this.isTutor ? Validators.required : ''],
            status: "NEW",
            resourceType: ['', this.isResource ? Validators.required : ''],
            resourceQuantity: ['', this.isResource ? Validators.required : ''],
            offers: [[]]
        });



        if (!this.isAddMode) {
            this.departmentService.getDepartmentById(this.departmentID)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    addResource() {
        //toggle isResource
        if(this.isResource) {
            this.isResource = false;
            this.isTutor = true;
        }
        else {
            this.isResource = true;
            this.isTutor = false;
        }

        this.form = this.formBuilder.group({
            description: ['', Validators.required],
            date: ['', this.isTutor ? Validators.required : ''],
            time: ['', this.isTutor ? Validators.required : ''],
            studentLevel: ['', this.isTutor ? Validators.required : ''],
            numberOfStudents: ['', this.isTutor ? Validators.required : ''],
            status: "NEW",
            resourceType: ['', this.isResource ? Validators.required : ''],
            resourceQuantity: ['', this.isResource ? Validators.required : ''],
            offers: [[]]
        });
    }

    reset() {
        this.isResource = false;
    }

    onSubmit() {

        this.submitted = true;
        console.log(this.form.value)
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


    setID(requestID, offerID, status) {
        this.offerID = offerID;
        this.requestID = requestID;
        this.updateStatus(status);
    }

    private addOffer() {
        this.departmentService.addOffer(this.departmentID, this.requestID, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['/request'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateStatus(status: string) {
        this.departmentService.updateStatus(this.departmentID, this.requestID, this.offerID, status)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Status updated', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }



    private addRequest() {
        this.departmentService.addRequest(this.departmentID, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
                    this.success = true;
                    this.router.navigate(['/requests'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                    this.success = false;
                }
            });
    }

}
