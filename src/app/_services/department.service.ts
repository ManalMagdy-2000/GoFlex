import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { environment } from '@environments/environment';
import { Department, Request, User, Review } from '@app/_models';
import { Subject} from 'rxjs';
import { tap } from 'rxjs/operators';
import {map} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class DepartmentService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    private _refreshrequired = new Subject<void>();
    get requiredRefresh(){
      return this._refreshrequired;
    }

    addDepartment(department: Department) {

        return this.http.post(`${environment.apiUrl}/api/departments`, department).pipe(
          tap(() => {
            this._refreshrequired.next(); // pipe and tap to trigger the next processa and show the departments without refreshing the page
          })
        );
    }

    getAllDepartments() {
       return this.http.get<{ alldeps :any}>(`${environment.apiUrl}/api/departments/getall`);
    }

    getAllDepartmentsTest(){

      return this.http.get<{ message : string , alldepstest :any}>(`${environment.apiUrl}/api/departments/getalltest`);

    }


    getDepartmentById(id: string) {
        return this.http.get<Department>(`${environment.apiUrl}/departments/${id}`);
       /*let res =  this.http.get<{ departmentID: string,
        name: string,
        employees: any ,
        requests: any }>('http://localhost:8080/api/departments/642715820c226e9f0b9ddfe9');
        res.subscribe(response => console.log("resp****" ,response));
        return res;*/
    }

    addRequest(id: string, request: Request) {
        return this.http.post(`${environment.apiUrl}/departments/request/${id}`, request);
    }

    getRequestById(departmentID: string, requestID: string) {
        return this.http.get<Request>(`${environment.apiUrl}/departments/${departmentID}/request/${requestID}`);
    }

    addEmployee(id: string, Employee: User) {
      console.log (" call api add empl" + id + Employee.email);
      id = "642f07f1e3614e7e317bcb67"; // IT dept
      //Employee.

    /*this.http.post<{user : string}>(`${environment.apiUrl}/api/departments/${id}/employee`, { Employee })
    .pipe( user => {
      return user;})
     .subscribe(res => {

console.log("api called successfully" , res)   ;
});*/
        return  this.http.post<{users : any}>(`${environment.apiUrl}/api/departments/${id}/employee`, { Employee });
    }

    getAllEmployees(){
      return this.http.get<User[]>(`${environment.apiUrl}/employees`);
    }

    addReview(departmentID: string, requestID: string, review: Review) {
        return this.http.post(`${environment.apiUrl}/departments/${departmentID}/request/${requestID}/review`, review);
    }

    updateStatus(departmentID: string, requestID: string, reviewID: string, status: string) {
        console.log(departmentID, requestID, reviewID, status);
        return this.http.post(`${environment.apiUrl}/departments/${departmentID}/request/${requestID}/review/${reviewID}`, { status });
    }
}
