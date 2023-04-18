/*
   Student Name : Manal Magdy Eid Khalil Eid
   Student ID : B1901825

*/
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AccountService, AlertService, DepartmentService } from '@app/_services';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Department, User } from '@app/_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'review-request.component.html' })
export class ReviewRequestComponent implements OnInit {
    departments = null;
    employees = null;
    username : string;
    form: UntypedFormGroup;
    departmentID: string;
    requests = null;
    requestID: string;
    isAddMode: boolean;
    department: Department;
    request: Request[];
    loading = false;
    requestsCount: number;
    countNewReq: number;
    submitted = false;
    user: User;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private departmentService: DepartmentService,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}


    ngOnInit() {
      this.accountService.getAll()
      .pipe( map ((userList) => {
         return userList.allusers.map( user => {
           return {
             username: user.username,
             fullname : user.fullname,
             password : user.password ,
             email : user.email ,
             requests : user.requests ,
             position : user.position ,
             status : "NEW",
             departmentCode : user.departmentCode,
             supervisorCode : user.supervisorCode,
           }
         }
         );
       })
       )
       .subscribe(employees => {this.employees = employees
       });


       this.accountService.getAllRequests()
       .pipe( map ((resp) => {
        return resp.allreqs.map( req => {
          return {
            date : req.date,
            requestID : req.requestID ,
            workType : req.workType,
            reason  : req.reason ,
            status : req.status ,
            description : req.description
          }
        }
        );
      }))
        .subscribe(x =>  {this.requests = x ; console.log("****reqs" , this.requests)});






        this.user = this.accountService.userValue;
        this.request = this.accountService.userValue.requests;

        // this.departmentID = this.route.snapshot.params['departmentID'];
        // this.requestID = this.route.snapshot.params['requestID'];
        this.isAddMode = !this.username;

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            remarks: ['', Validators.required],
            user: this.accountService.userValue, //employee
            request: [this.requestID]
        });

        if (!this.isAddMode) {
            this.accountService.getById(this.username)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
      console.log("review submitted");
      this.submitted = true;
      console.log(this.form)
      // reset alerts on submit
      this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }



      this.loading = true;

          this.addReview();
      // } else {
      //     this.updateUser();
      // }

  }

    countRequests() {
        let count = 0;
        for(let i = 0; i < this.employees.length; i++) {
            for(let j = 0; j < this.employees[i].requests.length; j++) {
                if(this.employees[i].requests[j].status != "CLOSED") {
                    count++;
                }
            }
        }
        return count;
    }



    //get number of requests for employee with status NEW
    countNewRequests(username) {
      let count = 0;
      for(let i = 0; i < this.employees.length; i++) {
          if(this.employees[i].username == username) {
              for(let j = 0; j < this.employees[i].requests.length; j++) {
                //  if(this.employees[i].requests[j].status == "PENDING")
                  if(this.employees[i].requests[j].status == "PENDING") {
                      count++;
                  }
              }
          }
      }
      console.log(count);
      return count;
  }
/*
    countPastRequests() {
        let count = 0;
        for(let i = 0; i < this.departments.length; i++) {
            for(let j = 0; j < this.departments[i].requests.length; j++) {
                if(this.departments[i].requests[j].status == "CLOSED") {
                    count++;
                }
            }
        }
        return count;
    }
    */






/*
    //get number of requests for department with status CLOSED
    countClosedRequests(departmentID) {
        let count = 0;
        for(let i = 0; i < this.departments.length; i++) {
            if(this.departments[i].departmentID == departmentID) {
                for(let j = 0; j < this.departments[i].requests.length; j++) {
                    if(this.departments[i].requests[j].status == "CLOSED") {
                        count++;
                    }
                }
            }
        }
        console.log(count);
        return count;
    }
    */


    setID(username, requestID) {
        if(this.user) {
            this.username = username;
            this.requestID = requestID;
        }
        else {
            //redirect to login
            this.router.navigate(['/account/login']);
        }
    }

    private addReview() {
        this.accountService.addReviewNew(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Review added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}
