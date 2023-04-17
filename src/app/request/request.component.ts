import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Data } from '@angular/router';
import { AccountService, AlertService, DepartmentService } from '@app/_services';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Department, Request } from '@app/_models';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';

@Component({ templateUrl: 'request.component.html' })
export class RequestComponent implements OnInit {

  selectedOption: string;
  disabledOptions = [];


    departments = null;
    form: FormGroup;
    id : string;
    departmentID: string;
    requests : any;
    requestID: string;
    reviewID: string;
    isAddMode: boolean;
    department: Department;
    loading = false;
    submitted = false;
    success = false;
    currentDate = new Date();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private departmentService: DepartmentService,
        private accountService: AccountService,
        private alertService: AlertService ,

    ) {   }


    ngOnInit() {

      // Read disabled options from local storage
     const disabledOptionsStr = localStorage.getItem('disabledOptions');
      if (disabledOptionsStr) {
        this.disabledOptions = JSON.parse(disabledOptionsStr);
      }



      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
      this.accountService.getAllRequests()
      .pipe( map ((resp) => {
       return resp.allreqs.map( req => {
         return {
           date : req.date,
           requestID : req.requestID ,


         }
       }
       );
     }))
       .subscribe(x =>  {this.requests = x ; console.log("****reqs" , this.requests)});


       
      this.accountService.requiredRefresh.subscribe( r => { //list new departments without refreshing the page
        this.accountService.getAllRequests()
       .pipe( map ((resp) => {
        return resp.allreqs.map( req => {
          return {
            date : req.date,
            requestID : req.requestID ,


          }
        }
        );
      }))
        .subscribe(x =>  {this.requests = x ; console.log("****reqs" , this.requests)});
    });

        this.requests = this.accountService.userValue.requests;
        this.departmentID = this.accountService.userValue.department;
        // this.requestID = this.route.snapshot.params['requestID'];
        this.isAddMode = !this.departmentID;

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            requestID : [this.requestID ] ,
            description: ['', Validators.required],
            status: "NEW",
            workType: ['', Validators.required ],
            reason: ['',Validators.required ],
            date: [this.currentDate],
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

        this.submitted = true;
             // Check if the option is disabled
          const selectedOption = this.f.workType.value;
             if (this.disabledOptions.includes(selectedOption)) {
               alert('This option is disabled');
               return;
             }



            // Disable the option and save to local storage
             this.disabledOptions.push(selectedOption);
             localStorage.setItem('disabledOptions', JSON.stringify(this.disabledOptions));


                  //localStorage.clear();

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


    setID(requestID, reviewID, status) {
        this.reviewID = reviewID;
        this.requestID = requestID;
        this.updateStatus(status);
    }

    private addReview() {
        this.departmentService.addReview(this.departmentID, this.requestID, this.form.value)
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
        this.departmentService.updateStatus(this.departmentID, this.requestID, this.reviewID, status)
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
      console.log(" id passed" , this.id)
       // this.accountService.addRequest(this.form.value , this.id)
       this.accountService.addRequestNew(this.form.value)
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
