import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Employee } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private employeeSubject: BehaviorSubject<Employee>;
    public employee: Observable<Employee>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.employeeSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('employee')));
        this.employee = this.employeeSubject.asObservable();
    }

    public get employeeValue(): Employee {
        return this.employeeSubject.value;
    }

    login(employeeid, password) {
        return this.http.post<Employee>(`${environment.apiUrl}/employees/authenticate`, { employeeid, password })
            .pipe(map(employee => {
                // store employee details and jwt token in local storage to keep employee logged in between page refreshes
                localStorage.setItem('employee', JSON.stringify(employee));
                this.employeeSubject.next(employee);
                return employee;
            }));
    }

    logout() {
        // remove employee from local storage and set current employee to null
        localStorage.removeItem('employee');
        this.employeeSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(employee: Employee) {
        return this.http.post(`${environment.apiUrl}/employees/register`, employee);
    }

    getAll() {
        return this.http.get<Employee[]>(`${environment.apiUrl}/employees`);
    }

    getById(id: string) {
        return this.http.get<Employee>(`${environment.apiUrl}/employees/${id}`);
    }

    getCurrentEmployee() {
        return this.http.get<Employee>(`${environment.apiUrl}/employees/current`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/employees/${id}`, params)
            .pipe(map(x => {
                // update stored employee if the logged in employee updated their own record
                if (id == this.employeeValue.employeeid) {
                    // update local storage
                    const employee = { ...this.employeeValue, ...params };
                    localStorage.setItem('employee', JSON.stringify(employee));

                    // publish updated employee to subscribers
                    this.employeeSubject.next(employee);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/employees/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in employee deleted their own record
                if (id == this.employeeValue.employeeid) {
                    this.logout();
                }
                return x;
            }));
    }
}
