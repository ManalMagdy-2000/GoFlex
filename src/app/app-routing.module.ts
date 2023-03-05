import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import {UserComponent } from './user';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { RequestComponent } from './request/request.component';
import { OfferComponent } from './offers/offers.component';
import { EmployeesComponent } from './employees/employees.component';
import { SupervisorsComponent } from './supervisors/supervisors.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const departmentsModule = () => import('./departments/departments.module').then(x => x.DepartmentsModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'departments', loadChildren: departmentsModule, canActivate: [AuthGuard], data: { roles: [Role.HRAdmin] } },
    { path: 'account', loadChildren: accountModule },
    { path: 'requests', component: RequestComponent, canActivate: [AuthGuard], data: { roles: [Role.Employee] }  },
    { path: 'offers', component: OfferComponent},
    { path: 'Employee', component:UserComponent, canActivate: [AuthGuard], data: { roles: [Role.Employee] } },
    { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard], data: { roles: [Role.HRAdmin] } },
    { path: 'supervisors', component: SupervisorsComponent, canActivate: [AuthGuard], data: { roles: [Role.HRAdmin] } },



    // otherwise redirect to home
    { path: '**', redirectTo: '/offers' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
