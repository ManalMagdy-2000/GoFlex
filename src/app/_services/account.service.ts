import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { tap } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }
    private _refreshrequired = new Subject<void>();
    get requiredRefresh(){
      return this._refreshrequired;
    }
    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username, password) {
        console.log("login : " + username + password);
        return this.http.post<User>(`${environment.apiUrl}/api/users/authenticate`, { username, password })
            .pipe(
                map(user => {
                    console.log("user : " + user);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                    return user;
                }),
                catchError(err => {
                    console.error('Error during login:', err);
                    // Rethrow the error so that it can be handled by the caller
                    return throwError(err);
                })
            );
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/api/users`, user);
    }

    getAll() {
        //return this.http.get<User[]>(`${environment.apiUrl}/users`);
        return this.http.get<{ allusers :any}>(`${environment.apiUrl}/api/users/getall`);
    }
    addSupervisor(id: string, supervisor: User) {
      console.log (" call api add sup : " + id + supervisor.email);
      id = "2"; //emp id


    /*this.http.post<{user : string}>(`${environment.apiUrl}/api/departments/${id}/employee`, { Employee })
    .pipe( user => {
      return user;})
     .subscribe(res => {

console.log("api called successfully" , res)   ;
});*/
        return  this.http.post<{users : any}>(`${environment.apiUrl}/api/users/${id}/supervisor`, { supervisor });
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/api/users/${id}`);
    }

    getCurrentUser() {
        return this.http.get<User>(`${environment.apiUrl}/users/current`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }



  addRequestNew( request: Request) {

    let username = this.userValue.username;

    console.log( " call end point create req new for user " , username);

      return this.http.post(`${environment.apiUrl}/api/request/${username}/addreq`, request).pipe(
        tap(() => {
          this._refreshrequired.next(); // pipe and tap to trigger the next processa and show the departments without refreshing the page
        })
      );

     }

 addRequest( request: Request , id : string) {
      return this.http.post(`${environment.apiUrl}/api/request/${id}`, request);
     }

  getAllRequests() {

      return this.http.get<{ allreqs :any}>(`${environment.apiUrl}/api/request/getall`);
  }
  getRequestByEmployeeID(id: number) {
    return this.http.get<Request[]>(`${environment.apiUrl}/request/${id}`);
}
  getRequestById(username: string, requestID: string) {
      return this.http.get<Request>(`${environment.apiUrl}/api/requests/${username}/request/${requestID}`);
  }
}
