import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Admin } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private adminSubject: BehaviorSubject<Admin>;
    public admin: Observable<Admin>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.adminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('admin')));
        this.admin = this.adminSubject.asObservable();
    }

    public get adminValue(): Admin {
        return this.adminSubject.value;
    }

    login(adminid, password) {
        return this.http.post<Admin>(`${environment.apiUrl}/admins/authenticate`, { adminid, password })
            .pipe(map(admin => {
                // store admin details and jwt token in local storage to keep admin logged in between page refreshes
                localStorage.setItem('admin', JSON.stringify(admin));
                this.adminSubject.next(admin);
                return admin;
            }));
    }

    logout() {
        // remove admin from local storage and set current admin to null
        localStorage.removeItem('admin');
        this.adminSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(admin: Admin) {
        return this.http.post(`${environment.apiUrl}/admins/register`, admin);
    }

    getAll() {
        return this.http.get<Admin[]>(`${environment.apiUrl}/admins`);
    }

    getById(id: string) {
        return this.http.get<Admin>(`${environment.apiUrl}/admins/${id}`);
    }

    getCurrentAdmin() {
        return this.http.get<Admin>(`${environment.apiUrl}/admins/current`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/admins/${id}`, params)
            .pipe(map(x => {
                // update stored admin if the logged in admin updated their own record
                if (id == this.adminValue.username) {
                    // update local storage
                    const admin = { ...this.adminValue, ...params };
                    localStorage.setItem('admin', JSON.stringify(admin));

                    // publish updated admin to subscribers
                    this.adminSubject.next(admin);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/admins/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in admin deleted their own record
                if (id == this.adminValue.username) {
                    this.logout();
                }
                return x;
            }));
    }
}
