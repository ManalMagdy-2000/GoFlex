import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Department, Request, User, Offer } from '@app/_models';
import { Role } from '../_models/role';

@Injectable({ providedIn: 'root' })
export class DepartmentService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    addDepartment(department: Department) {
        return this.http.post(`${environment.apiUrl}/departments/add`, department);
    }

    getAllDepartments() {
        return this.http.get<Department[]>(`${environment.apiUrl}/departments`);
    }

    getDepartmentById(id: string) {
        return this.http.get<Department>(`${environment.apiUrl}/departments/${id}`);
    }

    addRequest(id: string, request: Request) {
        return this.http.post(`${environment.apiUrl}/departments/request/${id}`, request);
    }

    getRequestById(departmentID: string, requestID: string) {
        return this.http.get<Request>(`${environment.apiUrl}/departments/${departmentID}/request/${requestID}`);
    }

    addAdmin(id: string, admin: User) {
        return this.http.post(`${environment.apiUrl}/departments/admin/${id}`, { admin });
    }
    getAllAdmins(){
      return this.http.get<User[]>(`${environment.apiUrl}/employees`);
    }

    addOffer(departmentID: string, requestID: string, offer: Offer) {
        return this.http.post(`${environment.apiUrl}/departments/${departmentID}/request/${requestID}/offer`, offer);
    }

    updateStatus(departmentID: string, requestID: string, offerID: string, status: string) {
        console.log(departmentID, requestID, offerID, status);
        return this.http.post(`${environment.apiUrl}/departments/${departmentID}/request/${requestID}/offer/${offerID}`, { status });
    }
}
