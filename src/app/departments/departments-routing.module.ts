import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_helpers';
import { Role } from '@app/_models';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { AddRequestComponent } from './add-request.component';
import { AddAdminComponent } from './add-admin.component';
import { AddOfferComponent } from './add-offer.component';
import { EmployeesComponent } from '../employees/employees.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'add', component: AddEditComponent },
            { path: 'request/:id', component: AddRequestComponent },
            { path: 'admin/:id', component: AddAdminComponent },
            { path: ':departmentID/request/:requestID', component: AddOfferComponent },
            { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard], data: { roles: [Role.SuperAdmin] } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
