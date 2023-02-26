
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
<<<<<<< HEAD:src/app/_services/employee.service.ts
import { environment } from '@environments/environment';
import { Request, Employee, Offer } from '@app/_models';
=======
import { environment } from 'src/environments/environment';
import { Employee } from '../_models';
import { Offer } from '../_models';
import { Request } from '../_models';
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/_services/employee.service.ts
import { Supervisor } from '../_models/supervisor';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    addEmployee(employee: Employee) {
        return this.http.post(`${environment.apiUrl}/employees/add`, employee);
    }

    getAllEmployees() {
        return this.http.get<Employee[]>(`${environment.apiUrl}/employees`);
    }

    getEmployeeById(id: string) {
        return this.http.get<Employee>(`${environment.apiUrl}/employees/${id}`);
    }

    addRequest(id: string, request: Request) {
        return this.http.post(`${environment.apiUrl}/departments/request/${id}`, request);
    }

    getRequestById(employeeID: string, requestID: string) {
        return this.http.get<Request>(`${environment.apiUrl}/employees/${employeeID}/request/${requestID}`);
    }

    addSupervisor(supervisorID: string, Supervisor: Supervisor) { //add supervisor
        return this.http.post(`${environment.apiUrl}/employees/Admin/${supervisorID}`, { Supervisor });
    }

    addOffer(employeeID: string, requestID: string, offer: Offer) {
        return this.http.post(`${environment.apiUrl}/employees/${employeeID}/request/${requestID}/offer`, offer);
    }

    updateStatus(employeeID: string, requestID: string, offerID: string, status: string) {
        console.log(employeeID, requestID, offerID, status);
        return this.http.post(`${environment.apiUrl}/employees/${employeeID}/request/${requestID}/offer/${offerID}`, { status });
    }
}
