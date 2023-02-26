import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
<<<<<<< HEAD:src/app/_services/department.service.ts
// هنا المدارس هتكون ال DPT
import { environment } from '@environments/environment';
import { Department, Request, Employee, Offer } from '@app/_models';
=======
import { environment } from 'src/environments/environment';
import { Department } from '../_models';
import { Employee } from '../_models';
import { Offer } from '../_models';
import { Request } from '../_models';
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/_services/department.service.ts

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

    addEmployee(id: string, Admin: Employee) {
        return this.http.post(`${environment.apiUrl}/departments/Admin/${id}`, { Admin });
    }

    addOffer(departmentID: string, requestID: string, offer: Offer) {
        return this.http.post(`${environment.apiUrl}/departments/${departmentID}/request/${requestID}/offer`, offer);
    }

    updateStatus(departmentID: string, requestID: string, offerID: string, status: string) {
        console.log(departmentID, requestID, offerID, status);
        return this.http.post(`${environment.apiUrl}/departments/${departmentID}/request/${requestID}/offer/${offerID}`, { status });
    }
}
