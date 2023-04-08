import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, DepartmentService } from '@app/_services';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Role, Department } from '@app/_models';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@coreui/angular';
import { User } from '@app/_models';
import { map } from 'rxjs/operators';
@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    departments = null;
    supervisors = null;
    employees = null;
    form: UntypedFormGroup;
    form2: UntypedFormGroup;
    departmentID: string;
    supervisorID : string ;
    requestID: string;
    isAddMode: boolean;
    isSupervisor = false;
    department: Department;
    requests: Request[];
    supervisor : Role.User;
    loading = false;
    submitted = false;


    id: string;
    username: string; //employee ID
    password: string;
    fullname: string;
    email: string;
    role: Role;
    position?: string;
    token: string;

    departmentCode : string;

    test :User  [];


    supervisorCode : string; 

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
        .pipe( map ((depList) => {
          return depList.alldeps.map( dep => {
            return {
              name: dep.name,
              departmentID: dep.departmentID
            }
          }
          );
        }))
        .subscribe(departments => {this.departments = departments
        });


        this.departmentService.requiredRefresh.subscribe( r => { //list new departments without refreshing the page
          this.departmentService.getAllDepartments()
          .pipe( map ((depList) => {
            return depList.alldeps.map( dep => {
              return {
                name: dep.name,
                departmentID: dep.departmentID
              }
            }
            );
          }))
          .subscribe(departments => {this.departments = departments
          });
        })



        this.accountService.getAll()
       /*.pipe( map ((userList) => {
        console.log("code");
        console.log(this.department.departmentID);

        this.test = userList.allusers.map( user => {
          return {
            username: user.username,
            fullname : user.fullname,
            password : user.password ,
            email : user.email ,
            position : user.position ,
            //supervisorID : user.supervisorID ,
            status : "NEW",
            departmentCode : user.departmentCode,
          }
        });
        return this.test.filter( user=>{ return user.departmentCode==this.departmentCode} )}
        )*/
       .pipe( map ((userList) => {
          return userList.allusers.map( user => {
            return {
              username: user.username,
              fullname : user.fullname,
              password : user.password ,
              email : user.email ,
              position : user.position ,
              //supervisorID : user.supervisorID ,
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
            employees: [[]],
            supervisors: [[]]
        });

        console.log(this.departmentID)
        console.log(this.supervisorCode)
        this.form2 = this.formBuilder.group({
            fullname: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            username: ['', Validators.required],
            password: ['', [Validators.required , Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]],
            position: ['', Validators.required],
            role: [Role.Employee],
            department: [this.departmentID],
            supervisorCode : ['', Validators.required] ,
            //supervisorID : ['' , this.isSupervisor ? Validators.required : ''] ,
            status :"NEW",
            schedules: [[]]
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

            this.createDepartment();
        // } else {
        //     this.updateUser();
        // }

    }

    reset(){
      this.isSupervisor = false;
    }

    onSubmit2() {
        this.submitted = true;
        console.log(this.form2.value)
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form2.invalid) {
            return;
        }



        this.loading = true;
        //toggle modal

        this.form2.patchValue({department: this.departmentID});
        this.form2.patchValue({supervisor: this.supervisorCode});
        this.createUser();
        // } else {
        //     this.updateUser();
        // }

    }
/*
    sendDeptId(id:string){
      console.log("id***" , this.departmentCode)
      this.departmentCode = id;
      this.employees.filter( user=>{ return user.departmentCode==this.departmentCode} )

    }
    */


    setID(departmentID: string) {
        this.departmentID = departmentID;
    }
    setSupID(supervisorCode: string) {
      this.supervisorCode = supervisorCode;
  }

    private createDepartment() {
      const dep  = new Department;
      dep.name = this.form.value.name;
        this.departmentService.addDepartment(dep)
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

    }

    addSuperEmp() {
      //toggle isResource
      if(this.isSupervisor) {
          this.isSupervisor = false;
      }
      else {
          this.isSupervisor = true;
      }
    }

    private createUser() {
      const u  = new User;
      u.username = this.form2.value.username;
      u.fullname = this.form2.value.fullname;
      u.email = this.form2.value.email;
      u.password = this.form2.value.password;
      u.position = this.form2.value.position;
      u.role = this.form2.value.role;
      u.supervisorCode = this.form2.value.supervisorCode;
      u.departmentCode = this.departmentID;
      console.log("user department" , this.departmentID);
      console.log("user supervisor" , this.supervisorCode);
        this.accountService.register(u)
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
