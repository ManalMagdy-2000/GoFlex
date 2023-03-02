import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddDepartmentComponent } from './add-department.component';
import { AddRequestComponent } from './add-request.component';
import { AddAdminComponent } from './add-admin.component';
import { AddOfferComponent } from './add-offer.component';
import { AdminListComponent } from './admin-list.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'add', component: AddDepartmentComponent },
            { path: 'request/:id', component: AddRequestComponent },
            { path: 'Admin/:id', component: AddAdminComponent },
            { path: ':departmentID/request/:requestID', component: AddOfferComponent },
            { path: 'admins', component: AdminListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
