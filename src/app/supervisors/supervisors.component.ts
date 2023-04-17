/*
   Student Name : Manal Magdy Eid Khalil Eid
   Student ID : B1901825

*/
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService, AlertService, DepartmentService } from '@app/_services';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Department, Role } from '@app/_models';
import { User } from '@app/_models';
import { map } from 'rxjs/operators';



import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-supervisors',
  templateUrl: './supervisors.component.html',
  styleUrls: ['./supervisors.component.scss']
})
export class SupervisorsComponent implements OnInit {
  form: UntypedFormGroup;
  submitted = false;
  loading = false;
  supervisors = null;
  departments : null;
  department : Department;
  departmentID : string;
  departmentCode



  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private departmentService : DepartmentService
  ) { }

  ngOnInit(): void {

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



    this.accountService.getAll()
    .pipe( map ((userList) => {
      return userList.allusers.map( user => {
        return {
          username: user.username,
          email : user.email ,
          departmentCode : user.departmentCode,
          fullname : user.fullname ,
          password : user.password ,
          position : user.position
        }
      }
      );
    }))
    .subscribe(supervisors => {this.supervisors = supervisors});



    console.log(this.departmentID)
    this.form = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      username: ['', Validators.required],
      password: ['', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      position : ['Supervisor'],
      role: [Role.User],
      departmentCode : ['', Validators.required] ,
      reviews :[[]]
  });



  }


  get f() { return this.form.controls; }
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
    this.form.patchValue({department: this.departmentCode});
    this.createUser();

}

private addSupervisor() {
  this.departmentService.addEmployee(this.departmentID, this.form.value)

}


setID(departmentCode: string) {
  this.departmentCode = departmentCode;
}


private createUser() {
  const u  = new User;
  u.username = this.form.value.username;
  u.fullname = this.form.value.fullname;
  u.email = this.form.value.email;
  u.password = this.form.value.password;
  u.position = this.form.value.position;
  u.role = this.form.value.role;
  u.departmentCode = this.form.value.departmentCode;
  console.log("supervisor department" , this.departmentCode);
  this.accountService.register(u)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Supervisor added successfully', { keepAfterRouteChange: true });
          this.addSupervisor();
          this.router.navigate(['../'], { relativeTo: this.route });
      },
          error: error => {
              this.alertService.error(error);
              this.loading = false;
          }
      });
}

}
