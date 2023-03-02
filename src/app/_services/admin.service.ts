
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Request, Admin, Offer } from '@app/_models';
import { Supervisor } from '../_models/supervisor';

@Injectable({ providedIn: 'root' })
export class AdminService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    addAdmin(admin: Admin) {
        return this.http.post(`${environment.apiUrl}/admins/add`, admin);
    }

    getAllAdmins() {
        return this.http.get<Admin[]>(`${environment.apiUrl}/admins`);
    }

    getAdminById(id: string) {
        return this.http.get<Admin>(`${environment.apiUrl}/admins/${id}`);
    }

    addRequest(id: string, request: Request) {
        return this.http.post(`${environment.apiUrl}/departments/request/${id}`, request);
    }

    getRequestById(username: string, requestID: string) {
        return this.http.get<Request>(`${environment.apiUrl}/admins/${username}/request/${requestID}`);
    }

    addSupervisor(supervisorID: string, Supervisor: Supervisor) { //add supervisor
        return this.http.post(`${environment.apiUrl}/admins/Admin/${supervisorID}`, { Supervisor });
    }

    addOffer(username: string, requestID: string, offer: Offer) {
        return this.http.post(`${environment.apiUrl}/admins/${username}/request/${requestID}/offer`, offer);
    }

    updateStatus(username: string, requestID: string, offerID: string, status: string) {
        console.log(username, requestID, offerID, status);
        return this.http.post(`${environment.apiUrl}/admins/${username}/request/${requestID}/offer/${offerID}`, { status });
    }
}
