import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Request} from '@app/_models';


@Injectable({ providedIn: 'root' })
export class RequestService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }
/*
    addRequest(id: string, request: Request) {
      return this.http.post(`${environment.apiUrl}/api/${id}`, { request });
    }
    createRequest(request: Request) {
        return this.http.post(`${environment.apiUrl}/api/requests`, request);
    }

    getAllRequests() {
        return this.http.get<Request[]>(`${environment.apiUrl}/api/requests`);
    }

    getRequestById(id: string) {
        return this.http.get<Request>(`${environment.apiUrl}/api/requests/${id}`);
    }
    */
}
