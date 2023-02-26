import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

<<<<<<< HEAD:src/app/_helpers/jwt.interceptor.ts
import { environment } from '@environments/environment';
import { AccountService } from '@app/_services';
=======
import { environment } from 'src/environments/environment';
import { AccountService } from '../_services';
>>>>>>> eed15adc5212a539c856651b6545744b256b06f9:flexISAngular/src/app/_helpers/jwt.interceptor.ts

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if employee is logged in and request is to the api url
        const employee = this.accountService.employeeValue;
        const isLoggedIn = employee && employee.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${employee.token}`
                }
            });
        }

        return next.handle(request);
    }
}
